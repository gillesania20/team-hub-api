import Comment from './Comment.js';
const commentCreate = async (docs) => {
    const query = await Comment.create(docs);
    return query;
}
export {
    commentCreate
}