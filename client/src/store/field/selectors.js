export const getFieldsSelector = ({ fields }) => ({
  fieldsById: fields.byId,
  fieldsIds: fields.allIds,
  currentFieldId: fields.currentFieldId,
});
