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
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tasks, setTasks] = useState<Array<TaskType>>([])
    const [taskError, setTaskError] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
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
        setTaskError(null)
        setError(null)
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
                setTaskError(id)
                setError(err.message)
            })
    }

    const delTask = (id: string) => {
        setTaskError(null)
        setError(null)
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
                setTaskError(id)
                setError(err.message)
            })
    }

    let errorView = (null)
    if (error) {
        errorView = (
            <div>
                {error}
            </div>
        )
    }

    let filtersView = (null)

    let tasksView = (null)
    if (!isLoading) {
        tasksView = (<div className="empty">no hay tareas registradas</div>)
    }

    if (tasks.length > 0) {
        tasksView = (<Tasks list={tasks} onDeleteTask={delTask} onVoteTask={likeTask} hasError={taskError} />)
    }

    return <div className="tasks-list">
        <h2>tareas comunitarias registradas</h2>
        {errorView}
        {filtersView}
        {tasksView}
        <div className="loading">
            {isLoading ? <LoadIcon /> : (null)}
        </div>
    </div>
}
