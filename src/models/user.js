import mongoose from 'mongoose';

const user = mongoose.model('Users', new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    confirmPassword: {
        type: String,
        require: true
    }
    ,
    role:  {
        type: Number,
        default: 0
    }
}, { versionKey: false }))

export default user