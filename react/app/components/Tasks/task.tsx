'use client'

import { useState } from 'react'

import { statesKeyName } from '@/app/utils/catalog'

import VoteIcon from '@/app/assets/icons/vote'
import DeleteIcon from '@/app/assets/icons/delete'
import MapIcon from '@/app/assets/icons/map'
import UserIcon from '@/app/assets/icons/user'

export default function Task(props: any) {
    const {
        task,
        onDeleteTask,
        onVoteTask,
    } = props;

    const [wasVoted, setWasVoted] = useState<boolean>(false);

    let deleteButton = (null)

    if (task.likes === 0) {
        deleteButton = (
            <button
                type="button"
                title="Borrar esta tareas"
                onClick={() => onDeleteTask(task.id)}
            >
                <DeleteIcon />
            </button>
        )
    }

    const vote = () => {
        setWasVoted(true);
        onVoteTask(task.id);
    }

    return <li className="task">
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
            <div>{deleteButton}</div>
            <button
                type="button"
                title="Votar por esta tarea"
                disabled={wasVoted}
                onClick={vote}
            >
                <VoteIcon />
            </button>
        </div>
    </li >
}
