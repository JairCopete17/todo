import { useState } from 'react'

import Form from './components/Form'
import ListOfTasks from './components/ListOfTasks'
import uid from './services/getUniqueId'

export default function App () {
  const data = JSON.parse(localStorage.getItem('data')) || [{ id: uid(), text: 'Start here', state: false }]

  const [tasks, setTasks] = useState(data)

  const addTask = (text) => {
    const newTask = { id: uid(), text: text, state: false }
    localStorage.setItem('data', JSON.stringify([...tasks, newTask]))
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => task.id != id)
    localStorage.setItem('data', JSON.stringify(remainingTasks))
    setTasks(remainingTasks)
  }

  const completeTask = (task, text, state) => {
    const activeTasks = tasks.filter(e => e.id != task.current.id)
    const completedTask = {id: task.current.id, text:text, state:!state}
    localStorage.setItem('data', JSON.stringify([...activeTasks, completedTask]))
    setTasks([...activeTasks, completedTask])
  }

  return (
    <main className="mx-auto max-w-3xl md:min-h-screen flex flex-col items-center justify-center">
      <header className="w-11/12 md:w-3/4 flex flex-row items-center gap-4 py-6">
        <img src="https://emojicdn.elk.sh/👋?style=apple" alt="Waving hand sign emoji" className="w-8 h-8" />
        <h1 className="text-2xl text-gray-600 font-bold">gm!</h1>
      </header>
      <Form addTask={addTask} />
      <ListOfTasks tasks={tasks} deleteTask={deleteTask} completeTask={completeTask} />
    </main>
  )
}