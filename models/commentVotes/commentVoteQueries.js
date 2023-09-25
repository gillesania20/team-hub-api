import CommentVote from './commentVote.js';
const commentVoteFindOne = async (conditions, projection, options) => {
    const query = await CommentVote.findOne(conditions, projection, options).lean().exec();
    return query;
}
const commentVoteFind = async (filter, projection, options) => {
    const query = await CommentVote.find(filter, projection, options).lean().exec();
    return query;
}
const commentVoteCreate = async (docs, options) => {
    const query = await CommentVote.create(docs, options);
    return query;
}
const commentVoteUpdateOne = async (filter, update, options) => {
    const query = await CommentVote.updateOne(filter, update, options);
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
    commentVoteFind,
    commentVoteCreate,
    commentVoteUpdateOne,
    commentVoteDeleteOne,
    commentVoteDeleteMany
}