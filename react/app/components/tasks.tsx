'use client'

import { useState, useEffect } from 'react'

import { statesKeyName } from '@/app/utils/catalog'

import getTasksList from '@/app/api/getTasksList';
import deleteTask from '@/app/api/deleteTask';
import addVoteTask from '@/app/api/addVoteTask';

type Task = {
    id: string;
    title: string;
    description: string;
    created_by: string;
    state: string;
    created_at: Date;
    likes: number;
};

const statesKey = {
    'MX-AGU': 'Aguascalientes',
    'MX-BCN': 'Baja California',
    'MX-BCS': 'Baja California Sur',
    'MX-CAM': 'Campeche',
    'MX-CHP': 'Chiapas',
    'MX-CHH': 'Chihuahua',
    'MX-CMX': 'Ciudad de México',
    'MX-COA': 'Coahuila',
    'MX-COL': 'Colima',
    'MX-DUR': 'Durango',
    'MX-GUA': 'Guanajuato',
    'MX-GRO': 'Guerrero',
    'MX-HID': 'Hidalgo',
    'MX-JAL': 'Jalisco',
    'MX-MEX': 'México',
    'MX-MIC': 'Michoacán',
    'MX-MOR': 'Morelos',
    'MX-NAY': 'Nayarit',
    'MX-NLE': 'Nuevo León',
    'MX-OAX': 'Oaxaca',
    'MX-PUE': 'Puebla',
    'MX-QUE': 'Querétaro',
    'MX-ROO': 'Quintana Roo',
    'MX-SLP': 'San Luis Potosí',
    'MX-SIN': 'Sinaloa',
    'MX-SON': 'Sonora',
    'MX-TAB': 'Tabasco',
    'MX-TAM': 'Tamaulipas',
    'MX-TLA': 'Tlaxcala',
    'MX-VER': 'Veracruz',
    'MX-YUC': 'Yucatán',
    'MX-ZAC': 'Zacatecas',
};

export default function Home() {
    const [tasks, setTasks] = useState<Array<Task>>([])

    useEffect(() => {
        getTasksList({})
            .then(tasksList => {
                setTasks(tasksList);
            })
            .catch(err => {
                console.log('err', err)
            })
    }, []);

    const addLikeToTask = (id: string) => {
        addVoteTask(id)
            .then(_ => {
                const updatedTasks = tasks.map((task) => {
                    if (task.id === id) {
                        task.likes = task.likes + 1;
                    }

                    return task;
                });

                setTasks(updatedTasks);
            })
            .catch(err => {
                console.log('err', err)
            })
    };

    const deleteThisTask = (id: string) => {
        deleteTask(id)
            .then(success => {
                const updatedTasks = tasks.filter((task) => {
                    if (task.id === id) {
                        return false;
                    }

                    return true;
                });

                setTasks(updatedTasks);
            })
            .catch(err => {
                console.log('err', err)
            })
    };

    let tasksView = (
        <div>
            No hay tareas registradas
        </div>
    )
    if (tasks.length > 0) {
        tasksView = (
            <div>
                <ul role="list" className="divide-y divide-gray-100">
                    {tasks.map((task) => {
                        let likesView = (
                            <div>
                                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Sin likes</span>
                            </div>
                        )

                        if (task.likes > 0) {
                            likesView = (<div>
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Likes {task.likes}</span>
                            </div>)
                        }

                        // {likesView}
                        let deleteButton = (null);
                        let deleteButtonClassesNames = 'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';
                        if (task.likes > 0) {
                            deleteButtonClassesNames += ' opacity-50 cursor-not-allowed';
                        } else {
                            deleteButton = (<button
                                type="button"
                                className={deleteButtonClassesNames}
                                onClick={() => deleteThisTask(task.id)}
                                disabled={task.likes > 0}>
                                eliminar
                            </button>)
                        }

                        return <li key={task.id} className="gap-x-6 py-5">
                            <div className="inline-flex items-center space-x-6">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">{task.title}</h3>
                                {likesView}
                                {deleteButton}
                            </div>
                            <div className="">
                                <div>
                                    Creada por: {task.created_by}
                                </div>
                                <div>
                                    Estado: {statesKeyName[task.state]}
                                </div>
                            </div>
                            <div className="mt-1 truncate text-lg leading-5 text-gray-700">
                                {task.description}
                            </div>
                            <div className="">
                                <button
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => addLikeToTask(task.id)}>
                                    votar
                                </button>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        )
    }

    return <div>
        <h2 className="text-xl font-bold">
            Tareas comunitarias registradas
        </h2>
        {tasksView}
    </div>
}