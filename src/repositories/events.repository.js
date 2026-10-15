import EventDAO from "../dao/events.dao.js";

class EventRepository {
    async create(data){
    return await EventDAO.create(data);
    }

    async findById(id){
    return await EventDAO.findById(id);
    }

    async update(id, data){
    return await EventDAO.update(id, data);
    }

    async findPaginated(filter, sort, skip, limit){
    const events = await EventDAO.find(filter, sort, skip, limit);
    const total = await EventDAO.count(filter);
    return { events, total };
    }   
}

export default new EventRepository();
