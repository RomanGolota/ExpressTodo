import Todo from "../model/Todo.js";
import mongoose from "mongoose";
import { ObjectId } from 'mongoose';

type TodoType = {
    text: string;
    user: any;
};

class TodosService {
    async getTodos(user: any): Promise<any> {
        try {
            return await Todo.find({ user: new mongoose.Types.ObjectId(user) });
        } catch (error) {
            console.log(error);
        }
    }

    async createNewTodo(todo: any): Promise<any> {
        try {
            await todo.save();
            return todo;
        } catch (error) {
            console.log("Error in createNewTodo");
            console.log(error);
        }
    }

    async getTodoById(id: string): Promise<any> {
        try {
            return await Todo.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    async updateTodo(id: string, updatedTodo: TodoType): Promise<any> {
        try {
            return await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteTodo(id: string): Promise<any> {
        try {
            return await Todo.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
}

export default TodosService;