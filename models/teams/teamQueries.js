import Team from './Team.js';
const teamCreate = async (docs, options) => {
    const query = await Team.create(docs, options);
    return query;
}
const teamFindAndPopulate = async (filter, projection, options) => {
    const query = await Team.find(filter, projection, options).populate('leader', 'username').lean().exec();
    return query;
}
const teamFindOne = async (conditions, projection, options) => {
    const query = await Team.findOne(conditions, projection, options).lean().exec();
    return query;
}
const teamFindOneAndPopulate = async (conditions, projection, options) => {
    const query = await Team.findOne(conditions, projection, options).populate('leader', 'username').lean().exec();
    return query;
}
const teamDeleteOne = async (filter, options) => {
    const query = await Team.deleteOne(filter, options);
    return query;
}
const teamUpdateOne = async (filter, update, options) => {
    const query = await Team.updateOne(filter, update, options);
    return query;
}
export {
    teamCreate,
    teamFindAndPopulate,
    teamFindOne,
    teamFindOneAndPopulate,
    teamDeleteOne,
    teamUpdateOne
}