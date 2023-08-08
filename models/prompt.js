import {Schema, model, models} from 'mongoose';

const PromptSchema = new Schema({
    creator: {
        // creator has to be a User Id drom the users schema
        type: Schema.Types.ObjectId,
        // one to many relationship, one user, many prompts
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required'],
    }
});

// use existing or generate new
const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;