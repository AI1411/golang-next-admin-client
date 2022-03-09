import {Todo} from "/types/todos/todo";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {STATUS_ARRAY} from "/const";
import {InitUser, User} from "/types/users/user";
import React, {useEffect, useState} from "react";
import useSWR from "swr";

const statusArr = STATUS_ARRAY;

const RegisterTodo = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<Todo>();

    const onSubmit: SubmitHandler<Todo> = data => axios.post("http://localhost:8084/todos", data).then(() => {
    }).catch(err => {
        console.log(err)
    });
    const fetcher = async (url: string): Promise<User[] | null> => {
        return await axios.get(url).then(res => res.data.data);
    };
    const {data, error} = useSWR("http://localhost:8084/users", fetcher);
    console.log(data)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
                    <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
                        <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">ADD POST</h1>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-lx font-serif">タイトル:</label>
                                <input
                                    {...register("title", {required: true, maxLength: 20})}
                                    type="text"
                                    placeholder="title"
                                    id="title"
                                    className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                                />
                                {errors.title && <p className="text-red-500 ml-2 outline-none py-1 px-2">タイトルは必須です</p>}
                            </div>
                            <div>
                                <label htmlFor="description"
                                       className="block mb-2 text-lg font-serif">本文:</label>
                                <textarea
                                    placeholder="whrite here.."
                                    {...register("body", {required: true, maxLength: 300})}
                                    id="body"
                                    className="w-full font-serif  p-4 text-gray-600 outline-none rounded-md"
                                />
                                {errors.body && <p className="text-red-500 ml-2 outline-none py-1 px-2">本文は必須です</p>}
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-lx font-serif">ステータス:</label>
                                <select
                                    {...register("status", {required: true, maxLength: 10})}
                                    className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                                >
                                    {statusArr.map((s) =>
                                        <option key={s.id} value={s.name}>{s.name}</option>
                                    )}
                                </select>
                                {errors.status && <p className="text-red-500 ml-2 outline-none py-1 px-2">ステータスは必須です</p>}
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-lx font-serif">担当者:</label>
                                <select
                                    {...register("user_id", {required: true, maxLength: 10})}
                                    className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                                >
                                    {data.map((user) =>
                                        <option key={user.id}
                                                value={String(user.id)}>{user.last_name} {user.first_name}
                                        </option>
                                    )}
                                </select>
                                {errors.user_id && <p className="text-red-500 ml-2 outline-none py-1 px-2">担当者は必須です</p>}
                            </div>
                            <button
                                type="submit"
                                className=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  ">ADD
                                POST
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default RegisterTodo;
