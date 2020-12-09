export const getEntityIdFromUrl = (url, prependPath) => {
  return url.replace(prependPath, "")
    .replace(new RegExp(`^([^/]*/){3}`), "")
    .replace(new RegExp(`/.*$`), "");
}