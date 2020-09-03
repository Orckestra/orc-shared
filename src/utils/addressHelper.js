export const buildInlineAddressFromObject = (address) => {
  const inlineAddress = `${address.line1}${address.line2 ? ` ${address.line2}` : ""}, ${address.city}, ${address.regionCode}, ${address.postalCode}, ${address.country}`;

  return inlineAddress;
}