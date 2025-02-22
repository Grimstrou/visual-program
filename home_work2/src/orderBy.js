function orderBy(arr, properties) {
    if (!Array.isArray(arr) || !arr.every(item => typeof item === 'object' && item !== null)) {
      throw new Error('Первый аргумент должен быть массивом объектов');
    }
  
    for (let prop of properties) {
      if (!arr.every(item => prop in item)) {
        throw new Error(`Отсутствует свойство "${prop}" у одного из объектов`);
      }
    }
  
    return arr.slice().sort((a, b) => {
      for (let prop of properties) {
        if (a[prop] < b[prop]) {
          return -1;
        }
        if (a[prop] > b[prop]) {
          return 1;
        }
      }
      return 0;
    });
  }
  
  module.exports = orderBy;