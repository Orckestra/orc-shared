export const buildInlineAddressFromObject = (address) => {
  let inlineAddress = "";
  const propsToUse = ["line1", "line2", "postalCode"];

  for (let i = 0; i < propsToUse.length; i++) {
    let tempProp = address[propsToUse[i]];
    if (tempProp != null) {
      inlineAddress += tempProp;
      if (i < propsToUse.length - 1) {
        inlineAddress += " ";
      }
    }
  }

  return inlineAddress;
}