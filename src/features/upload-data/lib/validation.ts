export function validateFile(file: File): boolean {
  return file.name.endsWith(".zip");
}