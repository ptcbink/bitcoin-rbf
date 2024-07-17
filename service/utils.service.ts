export const chooseWinner = async (array: Array<string>) => {
  const item = array[Math.floor(Math.random() * array.length)];
  return item;
};
