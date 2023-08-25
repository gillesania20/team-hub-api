import Post from './Post.js';
const postFindOne = async (conditions, projection, options) => {
    const query = await Post.findOne(conditions, projection, options).lean().exec();
    return query;
}
const postFindAndPopulate = async (filter, projection, options) => {
    const query = await Post.find(filter, projection, options).populate('user', 'username').sort({created_at: -1}).lean().exec();
    return query;
}
const postCreate = async (docs, options) => {
    const query = await Post.create(docs, options);
    return query;
}
const postUpdateOne = async (filter, update, options) => {
    const query = await Post.updateOne(filter, update, options);
    return query;
}
const postDeleteOne = async (conditions, options) => {
    const query = await Post.deleteOne(conditions, options);
    return query;
}
const postDeleteMany = async (conditions, options) => {
    const query = await Post.deleteMany(conditions, options);
    return query;
}
export {
    postFindOne,
    postFindAndPopulate,
    postCreate,
    postUpdateOne,
    postDeleteOne,
    postDeleteMany
}