// src/calcStatsFromAPI.js
const { loadData } = require('./loadData');
const { calcStats } = require('./calcStats');

async function calcStatsFromAPI() {
  const url = "https://catfact.ninja/breeds";
  const data = await loadData(url);
  return calcStats(data);
}

module.exports.calcStatsFromAPI = calcStatsFromAPI;
