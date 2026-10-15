import User from "../models/User.js";
import { isValidObjectId } from "mongoose";

class UserDAO {
    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }
    async findById(userId) {
        if (!isValidObjectId(userId)) {
            return null;
        }
        return await User.findById(userId);
    }
    async findOne(filter) {
        return await User.findOne(filter);
    }
    async find(filter) {
        const query = User.find(filter);
        return await query;
    }
    async update(id, updateData) {
        if (!isValidObjectId(id)) {
            return null;
        }
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }
}

export default new UserDAO();