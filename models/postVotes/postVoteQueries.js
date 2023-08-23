import PostVote from './PostVote.js';
const postVoteFindOne = async (conditions, projection, options) => {
    const query = await PostVote.findOne(conditions, projection, options).lean().exec();
    return query;
}
const postVoteFind = async (filter, projection, options) => {
    const query = await PostVote.find(filter, projection, options).lean().exec();
    return query;
}
const postVoteCreate = async (docs, options) => {
    const query = await PostVote.create(docs, options);
    return query;
}
const postVoteDeleteOne = async (conditions, options) => {
    const query = await PostVote.deleteOne(conditions, options);
    return query;
}
const postVoteDeleteMany = async (conditions, options) => {
    const query = await PostVote.deleteMany(conditions, options);
    return query;
}
export {
    postVoteFindOne,
    postVoteFind,
    postVoteCreate,
    postVoteDeleteOne,
    postVoteDeleteMany
}