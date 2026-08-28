import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    location: {type: String, required: true},
});

const Event = model('Event', eventSchema);

export default Event;