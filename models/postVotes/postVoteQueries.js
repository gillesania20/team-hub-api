import PostVote from './PostVote.js';
const postVoteFindOne = async (conditions, projection) => {
    const query = await PostVote.findOne(conditions, projection).lean().exec();
    return query;
}
const postVoteCreate = async (docs) => {
    const query = await PostVote.create(docs);
    return query;
}
const postVoteDeleteOne = async (conditions) => {
    const query = await PostVote.deleteOne(conditions);
    return query;
}
export {
    postVoteFindOne,
    postVoteCreate,
    postVoteDeleteOne
}