export default function Task ({ id, text, state, deleteTask }) {
	return (
		<li className="bg-gray-100 flex flex-row items-center gap-4 w-full min-h-min p-4 rounded-lg select-none">
			<input
        type="checkbox"
        className="flex items-center accent-teal-600"
        id={id}
        defaultChecked={state}
      ></input>
			<label className="h-full w-full" htmlFor={id}>{text}</label>
			<button
        className="text-gray-400 text-sm hover:underline underline-offset-2"
        onClick={() => deleteTask(id)}
      >
        Delete
      </button>
		</li>
	)
}