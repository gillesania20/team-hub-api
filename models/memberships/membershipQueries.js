import Membership from './Membership.js';
const membershipFindOne = async (conditions, projection) => {
    const query = await Membership.findOne(conditions, projection).lean().exec();
    return query;
}
const membershipCreate = async (docs) => {
    const query = await Membership.create(docs);
    return query;
}
const membershipDeleteOne = async (conditions) => {
    const query = await Membership.deleteOne(conditions);
    return query;
}
export {
    membershipFindOne,
    membershipCreate,
    membershipDeleteOne
}