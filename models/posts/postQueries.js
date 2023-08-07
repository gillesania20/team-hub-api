import Post from './Post.js';
const postFindAndPopulate = async (filter, projection) => {
    const query = await Post.find(filter, projection).populate('user', 'username').lean().exec();
    return query;
}
const postCreate = async (docs) => {
    const query = await Post.create(docs);
    return query;
}
export {
    postFindAndPopulate,
    postCreate
}