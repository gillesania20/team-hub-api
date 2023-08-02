import Team from './Team.js';
const teamCreate = async (docs) => {
    const query = await Team.create(docs);
    return query;
}
const teamFindOne = async (conditions, projection) => {
    const query = await Team.findOne(conditions, projection).lean().exec();
    return query;
}
export {
    teamCreate,
    teamFindOne
}