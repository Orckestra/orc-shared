export const isStringNullOrWhitespace = (string) => {
  return string == null || string.trim().length === 0;
}