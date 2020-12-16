export const getEntityIdFromUrl = (url, prependPath) => {
  return url.replace(prependPath, "")
    .replace(new RegExp(`^([^/]*/){1}`), "")
    .replace(new RegExp(`/.*$`), "");
}