import { useRef } from 'react'

export default function Task ({ id, text, state, deleteTask, completeTask }) {
  const inputRef = useRef()

	return (
		<li className="bg-gray-100 flex flex-row items-center gap-4 w-full min-h-min p-4 rounded-lg select-none">
			<input
        type="checkbox"
        className="flex items-center accent-teal-600"
        id={id}
        ref={inputRef}
        defaultChecked={state}
        onChange={() => completeTask(inputRef, text, state)}
      ></input>
			<label
        className={state ? "h-full w-full line-through transition-all": "h-full w-full"}
        htmlFor={id}
      >
        {text}
      </label>
			<button
        className="text-gray-400 text-sm hover:underline underline-offset-2"
        onClick={() => deleteTask(id)}
      >
        Delete
      </button>
		</li>
	)
}