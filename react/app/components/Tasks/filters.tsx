'use client'

import { useState, useEffect } from 'react'

import FilterIcon from '@/app/assets/icons/filter'

import { statesKeyName } from '@/app/utils/catalog'

export default function Filters() {
    const [filters, setFilters] = useState<Array<any>>([]);
    const [showFilterForm, setShowFilterForm] = useState<Boolean>(false);

    const [state, setState] = useState<string | null>('');
    const [createdBy, setCreatedBy] = useState<string | null>('');

    let filtersView = (null)
    if (filters.length > 0) {
        filtersView = (
            <ul>
                {filters.map((filter) => {
                    return (<li key={filter.key}>{filter.value}</li>)
                })}
            </ul>
        )
    }

    let filterForm = (null)
    if (showFilterForm) {
        let form = (null)
        /*
        if (filter === 'state') {
            form = (<div>state</div>)
        } else if (filter === 'createdBy') {
            form = (<div>creado por</div>)
        }
        */

        filterForm = (
            <div>
                <select on>
                    <option value="state">Estado</option>
                    <option value="createdBy">Creado por</option>
                </select>
                {form}
            </div>
        )
    }

    const addFilter = () => {
        setShowFilterForm(true)
    }

    return <div className="filters">
        <div>
            <FilterIcon />
        </div>
        {filtersView}
        {filterForm}
        <button type="button" onClick={addFilter}>
            Agregar
        </button>
    </div>
}