const isSortedAZ = (arr) => {
  const sorted = [...arr].sort();
  return JSON.stringify(arr) === JSON.stringify(sorted);
};

const isSortedZA = (arr) => {
  const sorted = [...arr].sort((a, b) => b.localeCompare(a));
  return JSON.stringify(arr) === JSON.stringify(sorted);
};

const isSortedLowToHigh = (arr) => {
   
  const sorted = [...arr].sort((a, b) => a - b);
  return sorted;
};

const isSortedHighToLow = (arr) => {
  const sorted = [...arr].sort((a, b) => b - a);
  return sorted;
};

export { isSortedAZ, isSortedZA, isSortedLowToHigh, isSortedHighToLow }