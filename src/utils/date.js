export const currentDate = () => {
  let newDate = new Date();

  let Year = newDate.getFullYear();
  let Month = newDate.getMonth() + 1;
  let Day = newDate.getDate();

  return `${Year}-${Month}-${Day}`;
};
