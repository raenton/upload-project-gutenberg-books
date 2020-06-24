/**
 * reduce nested arrays down to a deeply nested value
 * WARNING: the performance of this is not optimal.
 * when the properties are undefined, an empty array is used to allow
 * the function to continue. however this may result in doing a lot of
 * cpu work on empty arrays, if the provided data has many missing fields.
 * @param {Array} root
 * @param {string} properties property chain to split by: 'prop1.prop2.prop3'
 */
exports.deepFlatten = (root, properties) => {
  const splitProps = properties.split('.');
  const property = splitProps[0];

  const flat = root.reduce((acc, curr) => acc.concat(curr[property] || []), []);

  const nextProps = splitProps.slice(1);

  if (nextProps.length > 0) {
    return this.deepFlatten(flat, nextProps.join('.'));
  }
  return flat;
};
