/**
 * Checks if a file is a PDF by MIME type or file extension.
 * @param file File to check
 * @returns true if the file is a PDF
 */
export function isPDF(file: File): boolean {
  if (!file) return false;
  // Check MIME type
  if (file.type === "application/pdf") return true;
  // Fallback: check file extension (case-insensitive)
  return file.name.toLowerCase().endsWith(".pdf");
}
