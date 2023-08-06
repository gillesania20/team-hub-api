import Post from './Post.js';
const postCreate = (docs) => {
    const query = Post.create(docs);
    return query;
}
export {
    postCreate
}