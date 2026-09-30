import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    location: {type: String, required: true},
    category: {type: String, required: true},
    capacity: {type: Number, required: true, min: 1, validate :{ validator: Number.isInteger,
        message: 'La capacidad del Evento debe ser un numero entero. No se aceptan numeros decimales'}},
    price: {type: Number, min: 0, required: true,},
    status: {type: String, enum: ['draft', 'published', 'cancelled', 'finished'], default: 'draft', required: true},
    organizer: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

const Event = model('Event', eventSchema);

export default Event;