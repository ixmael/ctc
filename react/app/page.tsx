import Link from 'next/link'

import AddIcon from '@/app/assets/icons/add'

import TasksComponent from '@/app/components/Tasks'

export default function Home() {
  return <div className="home">
    <p className="">Iniciativa que busca incentivar la colaboración ciudadana en tareas comunitarias. Los ciudadanos otorgan &quot;likes&quot; a tareas que consideren relevantes.</p>

    <Link href="/tasks" className="task-add">
      <AddIcon className="icon-add" width={32} height={32} />
      <div>Agregar nueva tarea</div>
    </Link>

    <TasksComponent />
  </div>
}