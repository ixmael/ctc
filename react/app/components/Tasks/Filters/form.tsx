'use client'

import { useState } from 'react';

import { statesKeyName } from '@/app/utils/catalog';

export default function FiltersForm(props: any) {
    const {
        filters,
        onFilter,
    } = props;

    const [state, setState] = useState<string>(filters.state || '');
    const [createdBy, setCreatedBy] = useState<string>(filters.created_by || '');

    const clear = () => {
        setState('')
        setCreatedBy('')
    }

    const filter = () => {
        const newFilters = {} as any

        if (state !== '') {
            newFilters['state'] = state
        }

        if (createdBy !== '') {
            newFilters['created_by'] = createdBy
        }

        onFilter(newFilters)
    }

    return (
        <div className="filters-form">
            <div>
                <ul>
                    <li className={state !== '' ? 'setted' : 'empty'}>
                        <div className="key state">estado</div>
                        <select value={state} onChange={e => setState(e.target.value)}>
                            <option value="">seleccionar estado</option>
                            {Object.entries(statesKeyName).map((stateKey) => {
                                return (<option key={stateKey[0]} value={stateKey[0]}>{stateKey[1]}</option>)
                            })}
                        </select>
                    </li>
                    <li className={createdBy !== '' ? 'setted' : 'empty'}>
                        <div className="key created-by">creadas por</div>
                        <input id="created_by" name="created_by" value={createdBy} onChange={e => setCreatedBy(e.target.value)} />
                    </li>
                </ul>
            </div>

            <button
                type="button"
                onClick={() => clear()}
            >
                limpiar
            </button>

            <button
                type="button"
                onClick={() => filter()}
            >
                filtrar
            </button>
        </div>
    )
}
