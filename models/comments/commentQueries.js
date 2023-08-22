import Comment from './Comment.js';
const commentFind = async (filter, projection, options) => {
    const query = await Comment.find(filter, projection, options).lean().exec();
    return query;
}
const commentFindAndPopulate = async (filter, projection, options) => {
    const query = await Comment.find(filter, projection, options).populate('user', 'username').sort({created_at: 1}).lean().exec();
    return query;
}
const commentFindOne = async (conditions, projection, options) => {
    const query = await Comment.findOne(conditions, projection, options).lean().exec();
    return query;
}
const commentCreate = async (docs, options) => {
    const query = await Comment.create(docs, options);
    return query;
}
const commentUpdateOne = async (filter, update, options) => {
    const query = await Comment.updateOne(filter, update, options);
    return query;
}
const commentDeleteOne = async (conditions, options) => {
    const query = await Comment.deleteOne(conditions, options);
    return query;
}
const commentDeleteMany = async (conditions, options) => {
    const query = await Comment.deleteMany(conditions, options);
    return query;
}
export {
    commentFind,
    commentFindAndPopulate,
    commentFindOne,
    commentCreate,
    commentUpdateOne,
    commentDeleteOne,
    commentDeleteMany
}