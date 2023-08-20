import CommentVote from './CommentVote.js';
const commentVoteFindOne = async (conditions, projection, options) => {
    const query = await CommentVote.findOne(conditions, projection, options).lean().exec();
    return query;
}
const commentVoteCreate = async (docs, options) => {
    const query = await CommentVote.create(docs, options);
    return query;
}
const commentVoteDeleteOne = async (conditions, options) => {
    const query = await CommentVote.deleteOne(conditions, options);
    return query;
}
const commentVoteDeleteMany = async (conditions, options) => {
    const query = await CommentVote.deleteMany(conditions, options);
    return query;
}
export {
    commentVoteFindOne,
    commentVoteCreate,
    commentVoteDeleteOne,
    commentVoteDeleteMany
}