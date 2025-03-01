function getFields(objs, fields) {
    let resultArray = [];
    for (let i = 0; i < objs.length; i++) {
        if (fields[0] in objs[i]) {
            resultArray.push(objs[i][fields[0]]); 
        }
    }
    return resultArray;
}

module.exports = getFields;
