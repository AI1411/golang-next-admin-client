import {InitTodo, Todo} from "../todos/todo";

export type User = {
    id: number | null;
    first_name: string;
    last_name: string;
    image: string;
    age: number;
    email: string;
    password: string;
    password_confirmation: string;
    created_at: string;
    updated_at: string;
    todos: Todo[]
};

export const InitUser: User = {
    id: null,
    first_name: "",
    last_name: "",
    image: "",
    age: 0,
    email: "",
    password: "",
    password_confirmation: "",
    created_at: "",
    updated_at: "",
    todos: [InitTodo],
}
