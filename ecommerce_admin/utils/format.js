export const sliceString = (str, maxLenght) => {
  let word = str.split(" ");
  if (word.length <= maxLenght) {
    return str;
  } else {
    const newChange = word.slice(0, maxLenght).join(" ");
    const newString = newChange + "...";
    return newString;
  }
};

export const formatNumber = (number) => {
  const newNumber = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return newNumber;
};
