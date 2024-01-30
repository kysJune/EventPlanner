import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const UsersSchema = new Schema({
    username: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
    },
})
//import UsersSchema as users from './userModel';
//export default mongoose.model("users", UsersSchema);