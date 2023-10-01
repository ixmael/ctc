'use client'

import Task from './task'

export default function Tasks(props: any) {
    const {
        list,
        hasError,
        onDeleteTask,
        onVoteTask,
    } = props;

    return <ul className="tasks">
        {list.map((task: any) => {
            return (
                <Task
                    key={task.id}
                    task={task}
                    onDeleteTask={onDeleteTask}
                    onVoteTask={onVoteTask}
                    hasError={hasError === task.id}
                />
            )
        })}
    </ul>
}
