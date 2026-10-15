
const toUserDTO = (user) => {
    if (!user.first_name) {
        return user;
    }
    return{
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    }
};

const toEventDTO = (event) => {
    if (!event.title) {
        return event;
    }
    return {
        id: event.id,
        title: event.title,
        date: event.date,
        location: event.location
    };
};


export class TicketDTO {
    constructor(ticket) {
        this.id = ticket.id;
        this.user = toUserDTO(ticket.user);
        this.event = toEventDTO(ticket.event);
        this.status = ticket.status;
        this.quantity = ticket.quantity;
        this.reservationCode = ticket.reservationCode;
        this.cancelledAt = ticket.cancelledAt;
        this.createdAt = ticket.createdAt;
        this.updatedAt = ticket.updatedAt;
    }
}
