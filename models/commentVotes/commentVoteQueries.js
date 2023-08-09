import CommentVote from './CommentVote.js';
const commentVoteFindOne = async (conditions, projection) => {
    const query = await CommentVote.findOne(conditions, projection).lean().exec();
    return query;
}
const commentVoteCreate = async (docs) => {
    const query = await CommentVote.create(docs);
    return query;
}
export {
    commentVoteFindOne,
    commentVoteCreate
}