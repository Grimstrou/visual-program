const getFields = require('./index'); 
test('Извлечение полей', () => {
    const objs = [
        { name: "Настя", age: 22 },
        { name: "Никита", age: 28 },
        { name: "Артём" }
    ];
    const fields = ["name"];
    const result = getFields(objs, fields);
    expect(result).toEqual(["Настя", "Никита", "Артём"]);
});
