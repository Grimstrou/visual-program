// src/loadData.js
async function loadData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.data; // Возвращает массив данных о породах кошек
}

module.exports.loadData = loadData;
