//in code there is db defined but here is not so we mention in parameter
async function getData(db, colName, query) {
  return await db.collection(colName).find(query).toArray();
}

//for sort
async function getDataWithSort(db, colName, query, sort) {
  return await db.collection(colName).find(query).sort(sort).toArray();
}

//for pagination
async function getDataWithSortWithLimit(db, colName, query, sort, skip, limit) {
  return await db
    .collection(colName)
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray();
}

//post
async function postData(db, colName, data) {
  return await db.collection(colName).insertMany([data]);
}

//put
async function updateData(db, colName, condition, data) {
  return await db.collection(colName).updateMany(condition, data); //update(condition, projection)
}

module.exports = {
  getData,
  postData,
  updateData,
  getDataWithSort,
  getDataWithSortWithLimit,
}; //use {} because we want to export multiple methods
