export const isScrollVisible = (target) => {
  const clientWidth = target.clientWidth;
  const scrollWidth = target.scrollWidth;

  return scrollWidth - 1 > clientWidth; // -1 because of rounding in IE
};