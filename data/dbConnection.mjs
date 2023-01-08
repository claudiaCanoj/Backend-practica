import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_PATH, {useUnifiedTopology: true});        
    } catch (err) {
        console.log(err);
        throw new Error("Sin conexión");
    }
};

export { dbConnection };
