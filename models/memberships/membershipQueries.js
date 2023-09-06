import Membership from './Membership.js';
const membershipFindOne = async (conditions, projection, options) => {
    const query = await Membership.findOne(conditions, projection, options).lean().exec();
    return query;
}
const membershipFindAndPopulate = async (filter, projection, options) => {
    const query = await Membership.find(filter, projection, options).populate('team', 'name leader').lean().exec();
    return query;
}
const membershipCreate = async (docs, options) => {
    const query = await Membership.create(docs, options);
    return query;
}
const membershipDeleteOne = async (conditions, options) => {
    const query = await Membership.deleteOne(conditions, options);
    return query;
}
const membershipDeleteMany = async (conditions, options) => {
    const query = await Membership.deleteMany(conditions, options);
    return query;
}
export {
    membershipFindOne,
    membershipFindAndPopulate,
    membershipCreate,
    membershipDeleteOne,
    membershipDeleteMany
}