import mongoose from "mongoose";

let isConnected = false; // track connection
export const connectToDB = async () => {
    mongoose.set('strictQuery', true); // sets some settings

    if(isConnected){
        console.log('MongoDB is already connected');
        return;
    }

    try {
        // fcn awaits uri of our mongo db atlas instance or the uri
        // of our actual db
        // mongoDB atlas username: johnliebrich
        // password: ELZ13yGkiDN5gvgV
        // determined ip address: 156.67.135.213/32
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log('MongoDB is connected')
    } catch (error) {
        console.log(error);
    }


}
