module.exports.responseJSON = (res, status, content) => (
  res.status(status).send(content)
);
