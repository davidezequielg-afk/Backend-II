import userDAO from "../dao/users.dao.js";

class UserRepository {
    async create(userData) {
        return await userDAO.create(userData);
    }
    async findByEmail(email) {
        const user = await userDAO.findOne({ email });
        return user;
    }
    async findById(id) {
        const user = await userDAO.findById(id);
        return user;
    }
    async findAll() {
        return await userDAO.find({});
    }
}

export default new UserRepository();
