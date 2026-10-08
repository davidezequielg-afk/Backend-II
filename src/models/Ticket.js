import { Schema, model } from 'mongoose';

const ticketSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId,ref: 'User',required: true},
    event: {type: Schema.Types.ObjectId,ref: 'Event',required: true},
    status: {type: String,enum: ['confirmed', 'pending', 'cancelled'],default: 'pending'},
    quantity: {type: Number,min: 1, validate :{ validator: Number.isInteger,
        message: 'La capacidad de entradas debe ser un numero entero. No se aceptan numeros decimales'
    }},
    reservationCode: {type: String,unique: true, required: true},
    cancelledAt: {type: Date,default: null}
  },
  {timestamps: true}
)

const TicketModel = model('Ticket', ticketSchema)

export default TicketModel