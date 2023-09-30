'use client'

import Task from './task'

export default function Tasks(props: any) {
    const {
        list,
        onDeleteTask,
        onVoteTask,
    } = props;

    return <ul className="tasks">
        {list.map((task: any) => (<Task key={task.id} task={task} onDeleteTask={onDeleteTask} onVoteTask={onVoteTask} />))}
    </ul>
}
