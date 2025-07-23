const stringSimilarity = require("string-similarity");

exports.compareText = (inputText, referenceText) => {
  const similarity = stringSimilarity.compareTwoStrings(inputText, referenceText);
  return (similarity * 100).toFixed(2);
};
