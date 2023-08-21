import mongoose, { Schema, ObjectId } from "mongoose";

const category = mongoose.model('Category',
    new Schema({
        id: { type: ObjectId },
        name: { type: String, required: true, default: 'unCategorized' },
        slug: { type: String, required: true, default: 'unCategorized' },
        products: [
            {
                type: ObjectId,
                ref: 'Product'
            }
        ]
    }, {
        versionKey: false,
        timestamps: true
    })
)


export default category 