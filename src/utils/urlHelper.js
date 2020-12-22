export const getValueFromUrlByKey = (url, path, key) => {
  const valuesFromUrl = url.split('/');

  const keysFromPath = path.split('/');

  const keyIndex = keysFromPath.indexOf(key);

  return valuesFromUrl[keyIndex];
}