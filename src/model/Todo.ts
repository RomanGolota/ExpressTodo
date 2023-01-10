import { Schema, model } from "mongoose";

const todoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default model('Todo', todoSchema);

