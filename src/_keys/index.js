export default (() => {
  let keys = {};

  try {
    keys = require('./_keys.json');
  } catch(err) { }

  return keys;
})()