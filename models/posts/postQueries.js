import Post from './Post.js';
const postFindOne = async (conditions, projection) => {
    const query = await Post.findOne(conditions, projection).lean().exec();
    return query;
}
const postFindAndPopulate = async (filter, projection) => {
    const query = await Post.find(filter, projection).populate('user', 'username').lean().exec();
    return query;
}
const postCreate = async (docs) => {
    const query = await Post.create(docs);
    return query;
}
const postUpdateOne = async (filter, update) => {
    const query = await Post.updateOne(filter, update);
    return query;
}
const postDeleteOne = async (conditions) => {
    const query = await Post.deleteOne(conditions);
    return query;
}
export {
    postFindOne,
    postFindAndPopulate,
    postCreate,
    postUpdateOne,
    postDeleteOne
}