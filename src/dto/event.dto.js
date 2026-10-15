export class EventDTO {
    constructor(event) {
        this.id = event.id;
        this.title = event.title;
        this.description = event.description;
        this.date = event.date;
        this.location = event.location;
        this.category = event.category;
        this.capacity = event.capacity;
        this.price = event.price;
        this.status = event.status;
        this.organizer = event.organizer;
    }
}