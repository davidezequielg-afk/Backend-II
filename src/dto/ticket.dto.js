export class TicketDTO {
    constructor(ticket) {
        this.id = ticket.id;
        this.user = ticket.user;
        this.event = ticket.event;
        this.status = ticket.status;
        this.quantity = ticket.quantity;
        this.reservationCode = ticket.reservationCode;
        this.cancelledAt = ticket.cancelledAt;
        this.createdAt = ticket.createdAt;
        this.updatedAt = ticket.updatedAt;
    }
}