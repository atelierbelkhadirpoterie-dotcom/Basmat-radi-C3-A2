/**
 * Validate phone number has exactly 10 digits
 * @param phone - Phone number string
 * @returns true if phone has exactly 10 digits, false otherwise
 */
export function isValidPhoneNumber(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length === 10;
}

/**
 * Extract only digits from phone number
 * @param phone - Phone number string
 * @returns String containing only digits
 */
export function extractDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}
