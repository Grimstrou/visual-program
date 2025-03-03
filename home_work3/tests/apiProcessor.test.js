const { calcStatsFromAPI } = require('../src/calcStatsFromAPI');
const { loadData } = require('../src/loadData');

jest.mock('../src/loadData', () => ({
  loadData: jest.fn()
}));

test('Тестируем функцию calcStatsFromAPI', async () => {
  const mockData = [
    { breed: 'Turkish Van', country: 'Turkey', origin: 'Natural', coat: 'Semi-long', pattern: 'Van' },
    { breed: 'York Chocolate', country: 'United States', origin: 'Natural', coat: 'Long', pattern: 'Solid' }
  ];

  loadData.mockResolvedValue(mockData);

  const stats = await calcStatsFromAPI();

  expect(stats).toEqual({
    'Turkey': 1,
    'United States': 1
  });

  expect(loadData).toHaveBeenCalledTimes(1);
});
