export const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});

export const getAllIds = (array = []) => array.map(({ id }) => id);

export const normalizedData = (array = [], id) => ({
  byId: arrayToObject(array),
  allIds: id ? { [id]: getAllIds(array) } : getAllIds(array),
});
