import mongoose from 'mongoose';

const addSchema = mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        required: false
    }
}, { collection : 'nodepop.adds' });

const Add = mongoose.model('nodepop.adds', addSchema);

export { Add };