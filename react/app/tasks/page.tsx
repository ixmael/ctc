'use client'

import { useState } from 'react';
import Link from 'next/link'

import createANewTask from '@/app/api/createTask';

import { statesKeyName } from '@/app/utils/catalog';

export default function Task() {

    const [isValidData, setIsValidData] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [createdBy, setCreatedBy] = useState<string>('');

    const create = (e) => {
        e.preventDefault()

        if (isValidData) {

        }

        const newTask = {
            title,
            description,
            created_by: createdBy,
            state,
        };

        createANewTask(newTask)
            .then(_ => {
                console.log('stored');
            })
            .catch(err => {
                console.log('error', err)
            });

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

    return <div className="new-task">
        <div className="header">
            <Link href="/">regresar</Link>
            <h3>Nueva tarea comunitaria</h3>
        </div>
        <div className="content">
            <form method="POST" onSubmit={create} onChange={() => isValid()}>
                <div className="form-item">
                    <label htmlFor="title">título</label>
                    <input id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>

                <div className="form-item">
                    <label htmlFor="description">descripción</label>
                    <textarea id="description" name="description" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                </div>

                <div className="form-item">
                    <label htmlFor="state">estado</label>
                    <select id="state" name="state" value={state} onChange={e => setState(e.target.value)}>
                        <option>Seleccione el estado</option>
                        {Object.entries(statesKeyName).map((stateKey) => {
                            return (<option key={stateKey[0]} value={stateKey[0]}>{stateKey[1]}</option>)
                        })}
                    </select>
                </div>

                <div className="form-item">
                    <label htmlFor="created_by">tu nombre</label>
                    <input id="created_by" name="created_by" value={createdBy} onChange={e => setCreatedBy(e.target.value)} />
                </div>

                <div className="form-actions">
                    <button type="reset" onClick={clear}>clear</button>
                    <button type="submit" disabled={!isValidData}>guardar</button>
                </div>
            </form>
        </div>
    </div>
}