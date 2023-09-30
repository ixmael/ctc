'use client'

import { useState } from 'react';
import Link from 'next/link'

import createANewTask from '@/app/api/createTask';

import { statesKeyName } from '@/app/utils/catalog';

export default function Task() {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [createdBy, setCreatedBy] = useState<string>('');

    const create = (e) => {
        e.preventDefault()

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
    }

    return <div className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
        <div>
            <p className="text-xl text-gray-700">Crea una nueva tarea</p>
            <Link href="/">regresar</Link>
        </div>
        <form method="POST" onSubmit={create}>
            <div>
                <label>título</label>
                <input name="title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div>
                <label>descripción</label>
                <textarea name="description" onChange={e => setDescription(e.target.value)} value={description}></textarea>
            </div>

            <div>
                <label>estado</label>
                <select value={state} onChange={e => setState(e.target.value)}>
                    <option>Seleccione el estado</option>
                    {Object.entries(statesKeyName).map((stateKey) => {
                        return (<option key={stateKey[0]} value={stateKey[0]}>{stateKey[1]}</option>)
                    })}
                </select>
            </div>

            <div>
                <label>tu nombre</label>
                <input name="created_by" value={createdBy} onChange={e => setCreatedBy(e.target.value)} />
            </div>

            <div>
                <button type="reset" onClick={clear}>clear</button>
                <button type="submit">guardar</button>
            </div>
        </form >
    </div >
}