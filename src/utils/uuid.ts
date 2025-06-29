/**
 * Generate UUIDv7 with timestamp-based ordering
 */
export function generateUUIDv7(): string {
  const timestamp = Date.now();
  const timestampHex = timestamp.toString(16).padStart(12, '0');
  
  // Generate random bytes for the rest
  const randomBytes = new Uint8Array(10);
  crypto.getRandomValues(randomBytes);
  
  // Convert to hex
  const randomHex = Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  // Format as UUID v7
  const uuid = [
    timestampHex.slice(0, 8),
    timestampHex.slice(8, 12),
    '7' + randomHex.slice(0, 3), // Version 7
    ((parseInt(randomHex.slice(3, 4), 16) & 0x3) | 0x8).toString(16) + randomHex.slice(4, 7), // Variant bits
    randomHex.slice(7, 19)
  ].join('-');
  
  return uuid;
}