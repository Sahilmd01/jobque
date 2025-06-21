import mongoose from 'mongoose'

//function to connect mongodb database
const connectDB = async ()=>{
    mongoose.connection.on('connected',()=> console.log("Database connected"))

    await mongoose.connect(`${process.env.MONGODB_URI}/Sarvesh_2207`)
}

export default connectDB