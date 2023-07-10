import mongoose from "mongoose";

const mongoUri : string = (process.env.MONGODB_URI as string)

const connectMongo = async () =>{
    if (mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise()
    } else{
        try {
            await mongoose.connect(mongoUri)
        }
        catch(error){
            console.log(error)
        }
    }

}

const disconnectMongo = async () =>{
    try {
        await mongoose.disconnect()
    }
    catch(error){
        console.log(error)
    }
}

const database = {
    connectMongo,
    disconnectMongo
}

export default database