'use client'

import { useState, useEffect } from 'react'

import { TaskType } from '@/app/types'

import getTasksList from '@/app/api/getTasksList'
import addVoteTask from '@/app/api/addVoteTask'
import deleteTask from '@/app/api/deleteTask'

import LoadIcon from '@/app/assets/icons/load'

import Tasks from './tasks'

type FiltersType = {
    state?: string;
    created_by?: string;
}

export default function TasksComponent() {
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const [tasks, setTasks] = useState<Array<TaskType>>([])
    const [filters, setFilters] = useState<FiltersType>({})

    useEffect(() => {
        setIsLoading(true)
        getTasksList(filters)
            .then(tasksList => {
                setTasks(tasksList);
            })
            .catch(err => {
                console.log('err', err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, []);

    const likeTask = (id: string) => {
        addVoteTask(id)
            .then(_ => {
                // Update the current list
                const updatedTasks = tasks.slice().map((task) => {
                    if (task.id === id) {
                        task.likes = task.likes + 1;
                    }

                    return task;
                });

                // Set the updated tasks
                setTasks(updatedTasks);
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    const delTask = (id: string) => {
        deleteTask(id)
            .then(_ => {
                // Delete the task from the current tasks list
                const updatedTasks = tasks.slice().filter((task) => {
                    if (task.id === id) {
                        return false;
                    }

                    return true;
                });

                // Set the updated tasks
                setTasks(updatedTasks);
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    let filtersView = (null)

    let tasksView = (null)
    if (!isLoading) {
        tasksView = (<div className="empty">No hay tareas registradas</div>)
    }

    if (tasks.length > 0) {
        tasksView = (<Tasks list={tasks} onDeleteTask={delTask} onVoteTask={likeTask} />)
    }

    return <div className="tasks-list">
        <h2>Tareas comunitarias registradas</h2>
        {filtersView}
        {tasksView}
        <div className="loading">
            {isLoading ? <LoadIcon /> : (null)}
        </div>
    </div>
}
