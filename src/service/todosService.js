import Todo from "../model/Todo.js";
import mongoose from "mongoose";

class todosService {
    async getTodos(user) {
        try {
            return await Todo.find({ user: mongoose.Types.ObjectId(user.id) })
        } catch (error) {
            console.log(error)
        }
    }

    async createTodo(todo) {
        try {
            await todo.save();
            return todo
        } catch (error) {
            console.log(error)
        }
    }

    async getTodoById(id) {
        try {
            return await Todo.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    async updateTodo(id, updatedTodo) {
        try {
            return await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteTodo(id) {
        try {
            return await Todo.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new todosService();