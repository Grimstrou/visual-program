const orderBy = require('../src/orderBy');

describe('orderBy', () => {
  test('корректная сортировка по одному свойству', () => {
    const arr = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 }
    ];

    const result = orderBy(arr, ['name']);
    expect(result).toEqual([
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 }
    ]);
  });

  test('корректная сортировка по нескольким свойствам', () => {
    const arr = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Alice', age: 25 }
    ];

    const result = orderBy(arr, ['name', 'age']);
    expect(result).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 }
    ]);
  });

  test('бросает исключение, если первый аргумент не массив объектов', () => {
    expect(() => orderBy('string', ['name'])).toThrow('Первый аргумент должен быть массивом объектов');
    expect(() => orderBy([1, 2, 3], ['name'])).toThrow('Первый аргумент должен быть массивом объектов');
  });

  test('бросает исключение, если свойство отсутствует у объекта', () => {
    const arr = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 }
    ];

    expect(() => orderBy(arr, ['name', 'height'])).toThrow('Отсутствует свойство "height" у одного из объектов');
  });
});