export const sliceString = (str, maxLenght) => {
  if (str.split(" ").length > maxLenght) {
    return str.split(" ").slice(0, maxLenght).join(" ") + "...";
  } else {
    return str;
  }
};

export const formatNumber = (number) => {
  const newNumber = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return newNumber;
};
