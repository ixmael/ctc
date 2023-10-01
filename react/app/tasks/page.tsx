'use client'

import { useState } from 'react';
import Link from 'next/link'

import createANewTask from '@/app/api/createTask';

import { statesKeyName } from '@/app/utils/catalog';

import SaveIcon from '@/app/assets/icons/save';
import ClearIcon from '@/app/assets/icons/clear';

export default function Task() {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [taskWasCreated, setTaskWasCreated] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isValidData, setIsValidData] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [createdBy, setCreatedBy] = useState<string>('');

    const create = (e: any) => {
        e.preventDefault()

        if (isValidData) {
            const newTask = {
                title,
                description,
                created_by: createdBy,
                state,
            };

            setIsCreating(true);

            createANewTask(newTask)
                .then(_ => {
                    setTaskWasCreated(true)
                    clear()
                })
                .catch((err: any) => {
                    setError(err.message)
                })
                .finally(() => {
                    setIsCreating(false);
                });
        }

        return null;
    };

    const clear = () => {
        setTitle('')
        setDescription('')
        setState('')
        setCreatedBy('')
        setIsValidData(false)
    }

    const dataValidator = (): boolean => {
        if (title === '') {
            return false
        } else if (description === '') {
            return false
        } else if (state === '') {
            return false
        } else if (createdBy === '') {
            return false
        }

        return true
    }

    const isValid = () => {
        if (dataValidator()) {
            setIsValidData(true);
        } else {
            setIsValidData(false);
        }
    }

    let loadingView = (null)
    if (isCreating) {
        loadingView = (<div>loading</div>)
    }

    let createdView = (null)
    if (taskWasCreated) {
        createdView = (
            <div className="success">
                creada
            </div>
        )
    }

    let errorView = (null)
    if (error) {
        errorView = (
            <div className="error">
                {error}
            </div>
        )
    }

    return <div className="new-task">
        <div className="header">
            <Link className="return" href="/">regresar</Link>
            <h3>Nueva tarea comunitaria</h3>
        </div>
        {loadingView}
        {createdView}
        {errorView}
        <div className="content">
            <form method="POST" onSubmit={create} onChange={() => isValid()}>
                <div className="form-item">
                    <label htmlFor="title">título</label>
                    <input id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título de la tarea" />
                </div>

                <div className="form-item">
                    <label htmlFor="description">descripción</label>
                    <textarea id="description" name="description" onChange={e => setDescription(e.target.value)} value={description} placeholder="Descripción de la tarea"></textarea>
                </div>

                <div className="form-item">
                    <label htmlFor="state">estado</label>
                    <select id="state" name="state" value={state} onChange={e => setState(e.target.value)}>
                        <option>Seleccione el estado</option>
                        {Object.entries(statesKeyName).map((stateKey: any) => {
                            return (
                                <option
                                    key={stateKey[0]}
                                    value={stateKey[0]}
                                >
                                    {stateKey[1]}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="form-item">
                    <label htmlFor="created_by">tu nombre</label>
                    <input id="created_by" name="created_by" value={createdBy} onChange={e => setCreatedBy(e.target.value)} placeholder="Tu nombre" />
                </div>

                <div className="form-actions">
                    <button type="reset" onClick={clear}>
                        <ClearIcon width={32} height={32} />
                        <div>
                            Limpiar
                        </div>
                    </button>
                    <button className="save" type="submit" disabled={!isValidData || isCreating}>
                        <SaveIcon width={32} height={32} />
                        <div>
                            Salvar
                        </div>
                    </button>
                </div>
            </form>
        </div>
    </div>
}
