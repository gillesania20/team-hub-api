import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI;
const connectToDB = async (app, port) => {
    try{
        await mongoose.connect(MONGODB_URI);
        app.listen(port, ()=> console.log(`listening to port: ${port}`));
    }catch(err){
        console.log('cannot connect to DB');
    }
    return null;
}
export default connectToDB;