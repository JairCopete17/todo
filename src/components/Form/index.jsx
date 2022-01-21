import { useState } from 'react'

export default function Form ({ addTask }) {
	const [text, setText] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		text == '' ? alert('Yikes')	: addTask(text)
		setText('')
	}

	const handleChange = (e) => {
		setText(e.target.value)
	}

	return (
    <form onSubmit={handleSubmit} className="flex items-center w-11/12 md:w-3/4">
      <input
        type="text"
				value={text}
				onChange={handleChange}
				placeholder="Write a new task"
				className="bg-gray-300 w-full h-14 px-5 rounded-lg transition ease-in focus:outline-none focus:shadow-lg"
				required
      />
    </form>
  )
}