import User from './User.js';
const userCreate = async (docs) => {
    const query = await User.create(docs);
    return query;
}
const userFind = async (filter, projection) => {
    const query = await User.find(filter, projection).lean().exec();
    return query;
}
const userFindOne = async (condition, projection) => {
    const query = await User.findOne(condition, projection).lean().exec();
    return query;
}
const userUpdateOne = async (filter, update) => {
    const query = await User.updateOne(filter, update);
    return query;
}
export {
    userCreate,
    userFind,
    userFindOne,
    userUpdateOne
}