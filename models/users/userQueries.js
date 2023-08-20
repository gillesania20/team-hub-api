import User from './User.js';
const userCreate = async (docs, options) => {
    const query = await User.create(docs, options);
    return query;
}
const userFind = async (filter, projection, options) => {
    const query = await User.find(filter, projection, options).lean().exec();
    return query;
}
const userFindOne = async (condition, projection, options) => {
    const query = await User.findOne(condition, projection, options).lean().exec();
    return query;
}
const userUpdateOne = async (filter, update, options) => {
    const query = await User.updateOne(filter, update, options);
    return query;
}
export {
    userCreate,
    userFind,
    userFindOne,
    userUpdateOne
}