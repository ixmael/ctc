'use client'

import { useState } from 'react'

import { statesKeyName } from '@/app/utils/catalog'

import VoteIcon from '@/app/assets/icons/vote'
import DeleteIcon from '@/app/assets/icons/delete'
import MapIcon from '@/app/assets/icons/map'
import UserIcon from '@/app/assets/icons/user'
import DoneIcon from '@/app/assets/icons/done'

export default function Task(props: any) {
    const {
        task,
        onDeleteTask,
        onVoteTask,
        hasError,
    } = props;

    const [wasVoted, setWasVoted] = useState<boolean>(false)
    const [tryToDelete, setTryToDelete] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const askToDeleted = () => {
        setTryToDelete(true)
    }

    const forceToDelete = () => {
        setLoading(true);
        onDeleteTask(task.id)
    }

    let deleteView = (null)
    if (loading) {
        deleteView = (<div>borrando</div>)
    } else if (task.likes === 0) {
        if (tryToDelete) {
            deleteView = (<div>
                <div>¿estás seguro que quieres eliminar la tarea?</div>
                <button
                    type="button"
                    title="no borrar esta tarea"
                    onClick={() => setTryToDelete(false)}
                >
                    no
                </button>
                <button
                    type="button"
                    title="borrar esta tarea"
                    onClick={() => forceToDelete()}
                >sí</button>
            </div>)
        } else {
            deleteView = (
                <button
                    type="button"
                    title="borrar esta tarea"
                    onClick={() => askToDeleted()}
                >
                    <DeleteIcon />
                </button>
            )
        }
    }

    const vote = () => {
        setWasVoted(true);
        onVoteTask(task.id);
    }

    let errorView = (null)
    if (hasError) {
        errorView = (<div>error</div>)
    }

    let voteView = (
        <button
            type="button"
            title="Votar por esta tarea"
            disabled={wasVoted || loading}
            onClick={vote}
        >
            <VoteIcon />
        </button>
    )
    if (wasVoted) {
        voteView = (
            <div>
                <DoneIcon />
            </div>
        )
    }

    return <li className="task">
        {errorView}
        <div className="header">
            <h3>{task.title}</h3>
            <div>likes {task.likes}</div>
            <div>
                <div><MapIcon /> {statesKeyName[task.state]}</div>
                <div><UserIcon /> {task.created_by}</div>
            </div>
        </div>
        <div className="content">
            {task.description}
        </div>
        <div className="footer">
            {deleteView}
            {voteView}
        </div>
    </li >
}
