const newArray1 = [
    {
        id : 1,
        count : 0
    },
    {
        id : 2,
        count : 0
    },
    {
        id : 3,
        count : 0
    },
    {
        id : 4,
        count : 0
    },
    {
        id : 5,
        count : 0
    },
    {
        id : 6,
        count : 0
    },
]
const newArray2 = [
  {
    id: 8,
    count: 0,
  },
  {
    id: 9,
    count: 0,
  },
  {
    id: 10,
    count: 0,
  },
  {
    id: 11,
    count: 0,
  },
];
const oldArray = [
    {
        id : 1,
        count : 2
    },
    {
        id : 2,
        count : 2
    },
    {
        id : 3,
        count : 4
    },
    {
        id : 4,
        count : 5
    },
]

function merge(newArr, oldArr) {
  // Create a mapping of IDs from the old array to their corresponding counts
  const idToCountMap = new Map();
  oldArr.forEach((item) => {
    idToCountMap.set(item.id, item.count);
  });

  // Merge the arrays based on the conditions
  const mergedArray = newArr.map((item) => {
    if (idToCountMap.has(item.id)) {
      // Condition 1: ID exists in oldArray, use the count from oldArray
      item.count = idToCountMap.get(item.id);
    }
    return item;
  });

  return mergedArray;
}

// Example usage:
const mergedArray1 = merge(newArray1, oldArray);
const mergedArray2 = merge(newArray2, oldArray);

console.log(mergedArray1);
console.log(mergedArray2);
