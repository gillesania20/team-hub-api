import User from './User.js';
const userFindOne = async (condition, projection) => {
    const query = await User.findOne(condition, projection).lean().exec();
    return query;
}
export {
    userFindOne
}