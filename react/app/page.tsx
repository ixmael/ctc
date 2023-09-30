import Link from 'next/link'
import TasksComponent from '@/app/components/tasks';

export default function Home() {
    return <div className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
        <div>
            <p className="text-xl text-gray-700">Iniciativa que busca incentivar la colaboración ciudadana en tareas comunitarias. Los ciudadanos otorguen "likes" a tareas que consideren relevantes.</p>
        </div>
        <Link href="/tasks">Nueva tarea</Link>
        <TasksComponent />
    </div>
}