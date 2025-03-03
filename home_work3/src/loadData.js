async function loadData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
}

module.exports.loadData = loadData;
