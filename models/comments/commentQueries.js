import Comment from './Comment.js';
const commentFindAndPopulate = async (filter, projection) => {
    const query = await Comment.find(filter, projection).populate('user', 'username').lean().exec();
    return query;
}
const commentCreate = async (docs) => {
    const query = await Comment.create(docs);
    return query;
}
export {
    commentFindAndPopulate,
    commentCreate
}