import Comment from './Comment.js';
const commentFindAndPopulate = async (filter, projection) => {
    const query = await Comment.find(filter, projection).populate('user', 'username').lean().exec();
    return query;
}
const commentFindOne = async (conditions, projection) => {
    const query = await Comment.findOne(conditions, projection).lean().exec();
    return query;
}
const commentCreate = async (docs) => {
    const query = await Comment.create(docs);
    return query;
}
const commentUpdateOne = async (filter, update) => {
    const query = await Comment.updateOne(filter, update);
    return query;
}
export {
    commentFindAndPopulate,
    commentFindOne,
    commentCreate,
    commentUpdateOne
}