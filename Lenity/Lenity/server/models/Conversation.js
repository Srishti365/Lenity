const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const ConversationSchema = new Schema({
    recipients: [{ type: Schema.Types.ObjectId, ref: 'profiles' }],
    lastMessage: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = Conversation = mongoose.model(
    'conversations',
    ConversationSchema
);
