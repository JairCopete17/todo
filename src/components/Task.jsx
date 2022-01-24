import { useRef } from 'react'

export default function Task ({ id, text, state, date, deleteTask, completeTask }) {
  const inputRef = useRef()

  return (
    <li className={
      state
      ? "bg-gray-300 flex flex-row items-center gap-4 w-full min-h-min p-4 rounded-lg select-none transition-all"
      : "bg-gray-100 flex flex-row items-center gap-4 w-full min-h-min p-4 rounded-lg select-none transition-all"
    }
    >
      <input
        type="checkbox"
        className="flex items-center accent-slate-600"
        id={id}
        ref={inputRef}
        defaultChecked={state}
        onChange={() => completeTask(inputRef, text, date, state)}
      ></input>
      <label
        className={state ? "h-full w-full line-through decoration-2": "h-full w-full"}
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