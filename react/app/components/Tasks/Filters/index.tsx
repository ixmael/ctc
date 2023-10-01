'use client'

import { useState, useEffect } from 'react'

import FilterIcon from '@/app/assets/icons/filter'

import { statesKeyName } from '@/app/utils/catalog'

import FormFilters from './form'

export default function Filters(props: any) {
    const {
        filters: currentFilters,
        onUpdateFilters,
    } = props

    const [filters, setFilters] = useState<{}>(currentFilters);
    const [showFilterForm, setShowFilterForm] = useState<boolean>(false);

    let currentFiltersView = (
        <div className="without-filters">
            sin filtros
        </div>
    )
    if (Object.keys(filters).length > 0) {
        currentFiltersView = (
            <ul className="filters-applied">
                {Object.entries(filters).map((filter) => {
                    let key = 'creada por'
                    let value = filter[1]
                    let classesName = 'filter'

                    if (filter[0] === 'state') {
                        value = statesKeyName[filter[1]]
                        classesName += ' state'
                        key = 'estado'
                    } else {
                        classesName += ' created-by'
                    }

                    return (
                        <li key={filter[0]} className={classesName}>
                            <div className="key">
                                {key}:
                            </div>
                            <div>
                                {value}
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }

    const onFilter = (newFilters: any) => {
        setShowFilterForm(false)
        setFilters(newFilters)
        onUpdateFilters(newFilters)
    }

    let formFiltersView = (null)
    if (showFilterForm) {
        formFiltersView = (<FormFilters filters={filters} onFilter={onFilter} />)
    }

    return (
        <div className="filters">
            <div className="header">
                <button
                    type="button"
                    onClick={() => setShowFilterForm(!showFilterForm)}
                >
                    <FilterIcon width={32} height={32} />
                </button>
                {currentFiltersView}
            </div>
            {formFiltersView}
        </div>
    )
}
