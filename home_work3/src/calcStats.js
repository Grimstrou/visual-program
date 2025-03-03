function calcStats(catsInfo) {
  const stats = {};

  catsInfo.forEach(cat => {
    const country = cat.country;
    if (stats[country]) {
      stats[country]++;
    } else {
      stats[country] = 1;
    }
  });

  return stats;
}

module.exports.calcStats = calcStats;
