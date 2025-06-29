interface LeadData {
  lead_uuid: string;
  full_name: string;
  phone: string;
  email: string;
  departure_date: string;
  return_date: string;
  destination: string;
  consent: boolean;
  created_at: string;
  retry_count: number;
}

class LeadStorage {
  private dbName = 'dikla_leads';
  private storeName = 'pending_leads';
  private version = 1;

  async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'lead_uuid' });
          store.createIndex('created_at', 'created_at', { unique: false });
          store.createIndex('retry_count', 'retry_count', { unique: false });
        }
      };
    });
  }

  async storeLead(leadData: Omit<LeadData, 'retry_count'>): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    
    const dataWithRetry: LeadData = {
      ...leadData,
      retry_count: 0
    };
    
    return new Promise((resolve, reject) => {
      const request = store.add(dataWithRetry);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getPendingLeads(): Promise<LeadData[]> {
    const db = await this.openDB();
    const transaction = db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async removeLead(leadUuid: string): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.delete(leadUuid);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async incrementRetryCount(leadUuid: string): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    
    return new Promise((resolve, reject) => {
      const getRequest = store.get(leadUuid);
      getRequest.onsuccess = () => {
        const lead = getRequest.result;
        if (lead) {
          lead.retry_count += 1;
          const putRequest = store.put(lead);
          putRequest.onsuccess = () => resolve();
          putRequest.onerror = () => reject(putRequest.error);
        } else {
          resolve();
        }
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  }
}

export const leadStorage = new LeadStorage();