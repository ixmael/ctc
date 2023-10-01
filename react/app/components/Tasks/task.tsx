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
    let countClasses = 'count'
    if (loading) {
        deleteView = (<div>borrando</div>)
    } else if (task.likes === 0) {
        countClasses += ' empty'
        if (tryToDelete) {
            deleteView = (
                <div className="delete">
                    <p>¿estás seguro que quieres eliminar la tarea?</p>
                    <div className="actions">
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
                        >
                            sí
                        </button>
                    </div>
                </div>
            )
        } else {
            deleteView = (
                <button
                    type="button"
                    title="borrar esta tarea"
                    onClick={() => askToDeleted()}
                >
                    <DeleteIcon width={32} height={32} />
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
            <VoteIcon width={32} height={32} />
        </button>
    )
    if (wasVoted) {
        voteView = (
            <div className="voted">
                <DoneIcon width={32} height={32} />
            </div>
        )
    }

    return <li className="task">
        {errorView}
        <div className="header">
            <h3>{task.title}</h3>
            <div className="likes">
                <div className="label">likes</div>
                <div className={countClasses}>{task.likes}</div>
            </div>
        </div>
        <div className="content">
            {task.description}
        </div>
        <div className="footer">
            <div className="metadata">
                <div className="state">
                    <MapIcon width={16} height={16} />
                    <div>{statesKeyName[task.state]}</div>
                </div>
                <div className="user">
                    <UserIcon width={16} height={16} />
                    <div>{task.created_by}</div>
                </div>
            </div>
            <div className="actions">
                {deleteView}
                {voteView}
            </div>
        </div>
    </li >
}
