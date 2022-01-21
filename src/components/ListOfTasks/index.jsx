import Task from '../Task'

export default function ListOfTasks ({ tasks, deleteTask, completeTask }) {
	return (
		<ul className="flex flex-col items-center gap-4 w-11/12 md:w-3/4 my-4">
      {tasks.map((task) => (
				<Task
					id={task.id}
					key={task.id}
					text={task.text}
					state={task.state}
					deleteTask={deleteTask}
					completeTask={completeTask}
				/>
			))}
    </ul>
	)
}