export const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});

export const getAllIds = (array = []) => array.map(({ id }) => id);

export const union = (arr1, arr2) => [...new Set([...arr1, ...arr2])];

export const normalizedData = (array = []) => ({
  byId: arrayToObject(array),
  allIds: getAllIds(array),
});

export const normalizedRegionData = (array = [], id) => ({
  byId: arrayToObject(array),
  allIds: { [id]: getAllIds(array) },
});
