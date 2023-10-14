export function toSlug(str : string | undefined) {
  return str?.toLowerCase().replace(/\s+/g, '-');
}

export function merge(newArr: any[], oldArr: any[]) {
  // Create a mapping of IDs from the old array to their corresponding counts
  const idToCountMap = new Map();
  oldArr?.forEach((item) => {
    idToCountMap.set(item.id, item.count);
  });

  // Merge the arrays based on the conditions
  const mergedArray = newArr.map((newItem) => {
    if (idToCountMap.has(newItem.id)) {
      // Condition 1: ID exists in oldArray, use the count from oldArray
      const oldItem = oldArr.find((item) => item.id === newItem.id);
      newItem.count = idToCountMap.get(newItem.id);
      // Merge other properties from oldItem to newItem
      Object.assign(newItem, oldItem);
    }
    return newItem;
  });

  return mergedArray;
}
