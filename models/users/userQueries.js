import User from './User.js';
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
    userFind,
    userFindOne,
    userUpdateOne
}