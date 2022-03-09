export type Todo = {
    id: number;
    title: string;
    body: string;
    status: string;
    user_id: number;
    user: {
        id: number;
        last_name: string;
        first_name: string;
    }
};

export const InitTodo: Todo = {
    id: 0,
    title: "",
    body: "",
    status: "",
    user_id: 0,
    user: {
        id: 0,
        last_name: "",
        first_name: "",
    }
}
