import mongoose, { Schema, ObjectId } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const product = mongoose.model('Products',
    new Schema({
        id: { type: ObjectId },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
        categoryId: { type: ObjectId, required: true, default: 'unCategories', ref: 'Category' }
    }, {
        versionKey: false,
        timestamps: true
    }).plugin(mongoosePaginate)
)


export default product 