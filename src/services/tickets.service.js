import ticketRepository from "../repositories/tickets.repository.js";
import { sendTicketConfirmation } from "../utils/mailer.js";
import EventRepository from "../repositories/events.repository.js";
import { randomUUID } from "crypto";

const fail = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

export const createTicket = async (eventId, user, quantity) => {
    const quantityInt = Number(quantity);
    if (!Number.isInteger(quantityInt) || quantityInt <= 0) {
        throw fail(400, "La cantidad de boletos debe ser mayor a cero");
    };

    const event = await EventRepository.findById(eventId);
    if (!event) {throw fail(404, "El evento no fue encontrado");};
    if (event.status === "cancelled" || event.status === "finished") {
        throw fail(400, "No se pueden crear boletos para un evento cancelado o finalizado");};
    if (event.status !== "published") {
        throw fail(400, "No se pueden crear boletos para un evento que no está publicado");
    };
    if (event.date && new Date(event.date) < new Date()) {
        throw fail(400, "No se pueden crear boletos para un evento que ya ha ocurrido");
    };
    
    const ticketDuplicate = await ticketRepository.findActiveByUserAndEvent(user.id, eventId);
    if (ticketDuplicate) {
        throw fail(409, "Ya existe un boleto para este usuario en el mismo evento");
    };
    
    const cantTickets = event.capacity - await ticketRepository.countActiveTickets(eventId);
    if (Number(quantityInt) > cantTickets) {
        throw fail(409, `No hay suficientes boletos disponibles para este evento`);
    };
    const userEmail = user.email;
    const ticket = await ticketRepository.create({ user: user.id, event: eventId, quantity: quantityInt, status: "confirmed", reservationCode: randomUUID() });
    await sendTicketConfirmation(userEmail, "Confirmación de compra de boletos", 
       `Has comprado ${quantityInt} boletos para el evento "${event.title}". 
        Tu código de reserva es ${ticket.reservationCode}.`);

    return ticket;
};

export const getEventTickets = async (eventId, user) => {
    const event = await EventRepository.findById(eventId);
    if (!event) {
        throw fail(404, "El evento no fue encontrado");
    };
    if (user.role !== "admin" && event.organizer.toString() !== user.id) {
        throw fail(403, "No tienes permiso para ver los boletos de este evento");
    };
    const tickets = await ticketRepository.findByEvent(eventId);
    return tickets;
};

export const cancelTicket = async (ticketId, user) => {
    const ticket = await ticketRepository.findById(ticketId);
    if (!ticket) {
        throw fail(404, "El Ticket o boleto no fue encontrado");
    };
    if (ticket.user.toString() !== user.id && user.role !== "admin") {
        throw fail(403, "No tienes permiso para cancelar este boleto");
    };
    if (ticket.status === "cancelled") {
        throw fail(400, "El boleto ya está cancelado");
    };
    const updatedTicket = await ticketRepository.cancelTicket(ticketId);

    return updatedTicket;
};

export const getMyTickets = async (userId) => {
    const tickets = await ticketRepository.findByUser(userId);
    return tickets;
};