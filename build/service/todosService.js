import Todo from "../model/Todo.js";
import mongoose from "mongoose";
class TodosService {
    async getTodos(user) {
        try {
            return await Todo.find({ user: new mongoose.Types.ObjectId(user) });
        }
        catch (error) {
            console.log(error);
        }
    }
    async createNewTodo(todo) {
        try {
            await todo.save();
            return todo;
        }
        catch (error) {
            console.log("Error in createNewTodo");
            console.log(error);
        }
    }
    async getTodoById(id) {
        try {
            return await Todo.findById(id);
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateTodo(id, updatedTodo) {
        try {
            return await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteTodo(id) {
        try {
            return await Todo.findByIdAndDelete(id);
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default TodosService;
//# sourceMappingURL=todosService.js.map