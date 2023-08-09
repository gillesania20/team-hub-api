import CommentVote from './CommentVote.js';
const commentVoteFindOne = async (conditions, projection) => {
    const query = await CommentVote.findOne(conditions, projection).lean().exec();
    return query;
}
const commentVoteCreate = async (docs) => {
    const query = await CommentVote.create(docs);
    return query;
}
const commentVoteDeleteOne = async (conditions) => {
    const query = await CommentVote.deleteOne(conditions);
    return query;
}
export {
    commentVoteFindOne,
    commentVoteCreate,
    commentVoteDeleteOne
}