// tests/apiProcessor.test.js
const { calcStatsFromAPI } = require('../src/calcStatsFromAPI');
const { loadData } = require('../src/loadData');

// Мокируем функцию loadData
jest.mock('../src/loadData', () => ({
  loadData: jest.fn()
}));

test('Тестируем функцию calcStatsFromAPI', async () => {
  // Мокируем возвращаемые данные
  const mockData = [
    { breed: 'Turkish Van', country: 'Turkey', origin: 'Natural', coat: 'Semi-long', pattern: 'Van' },
    { breed: 'York Chocolate', country: 'United States', origin: 'Natural', coat: 'Long', pattern: 'Solid' }
  ];

  // Устанавливаем мокированное поведение для loadData
  loadData.mockResolvedValue(mockData);

  const stats = await calcStatsFromAPI();

  // Проверяем, что статистика была вычислена правильно
  expect(stats).toEqual({
    'Turkey': 1,
    'United States': 1
  });

  // Убедимся, что loadData была вызвана только один раз
  expect(loadData).toHaveBeenCalledTimes(1);
});
