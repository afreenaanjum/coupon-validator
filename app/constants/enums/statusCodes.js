// https://stackoverflow.com/questions/287903/what-is-the-preferred-syntax-for-defining-enums-in-javascript
//Lerat how to write ENUMS
const STATUSCODES = Object.freeze({
  SUCCESS: 200,
  ERROR: 404,
  BAD_REQUEST: 400,
});
module.exports = {
  STATUSCODES,
};
