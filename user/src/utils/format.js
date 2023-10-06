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

export const formatDate = (dateString) => {
  const dateObject = new Date(dateString);

  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const year = dateObject.getFullYear();
  const hours = dateObject
    .getHours()
    .toString()
    .padStart(2, "0");
  const minutes = dateObject
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const seconds = dateObject
    .getSeconds()
    .toString()
    .padStart(2, "0");

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};
