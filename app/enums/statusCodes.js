// https://stackoverflow.com/questions/287903/what-is-the-preferred-syntax-for-defining-enums-in-javascript
//Lerat how to write ENUMS
const StatusCode = Object.freeze({
  success: 200,
  error: 404,
  badRequest: 400,
});
module.exports = {
  StatusCode,
};
