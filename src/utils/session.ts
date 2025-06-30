import { generateUUIDv7 } from './uuid';

export class UserSession {
  private static readonly SESSION_KEY = 'dikla_user_session';
  private static readonly LEAD_KEY = 'dikla_current_lead';
  
  /**
   * Get or create a unique session ID for the current user
   */
  static getOrCreateSessionId(): string {
    let sessionId = localStorage.getItem(this.SESSION_KEY);
    if (!sessionId) {
      sessionId = generateUUIDv7();
      localStorage.setItem(this.SESSION_KEY, sessionId);
    }
    return sessionId;
  }
  
  /**
   * Get the current session ID if it exists
   */
  static getSessionId(): string | null {
    return localStorage.getItem(this.SESSION_KEY);
  }
  
  /**
   * Clear the current session
   */
  static clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.LEAD_KEY);
  }
  
  /**
   * Store the current lead UUID
   */
  static setCurrentLeadUuid(leadUuid: string): void {
    localStorage.setItem(this.LEAD_KEY, leadUuid);
  }
  
  /**
   * Get the current lead UUID if it exists
   */
  static getCurrentLeadUuid(): string | null {
    return localStorage.getItem(this.LEAD_KEY);
  }
  
  /**
   * Get identifier for tracking (lead UUID if available, otherwise session ID)
   */
  static getTrackingId(): string {
    const leadUuid = this.getCurrentLeadUuid();
    return leadUuid || this.getOrCreateSessionId();
  }
} 