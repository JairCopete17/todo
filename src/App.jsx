import { useState } from 'react'
import { Provider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import Form from './components/Form'
import ListOfTasks from './components/ListOfTasks'
import Wallet from './components/Wallet'

import uid from './services/getUniqueId'

//TODO: Add WalletConnect
const connectors = () => {
  return [ new InjectedConnector() ]
}

export default function App () {
  const localtasks = JSON.parse(localStorage.getItem('localtasks')) || [{ id: uid(), text: 'Start here', state: false }]

  const [tasks, setTasks] = useState(localtasks)

  const addTask = (text) => {
    const newTask = { id: uid(), text: text, state: false }
    localStorage.setItem('localtasks', JSON.stringify([...tasks, newTask]))
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => task.id != id)
    localStorage.setItem('localtasks', JSON.stringify(remainingTasks))
    setTasks(remainingTasks)
  }

  const completeTask = (task, text, state) => {
    const activeTasks = tasks.filter(e => e.id != task.current.id)
    const completedTask = {id: task.current.id, text:text, state:!state}
    localStorage.setItem('localtasks', JSON.stringify([...activeTasks, completedTask]))
    setTasks([...activeTasks, completedTask])
  }

  return (
    <Provider autoConnect connectors={connectors}>
      <main className="mx-auto max-w-3xl md:min-h-screen flex flex-col items-center justify-center">
        <header className="w-11/12 md:w-3/4 flex flex-row items-center py-6 select-none">
          <img src="https://emojicdn.elk.sh/👋?style=apple" alt="Waving hand sign emoji" className="w-8 h-8 mr-4" />
          <h1 className="text-2xl text-gray-600 font-bold">gm</h1>
          <Wallet />
        </header>
        <Form addTask={addTask} />
        <ListOfTasks tasks={tasks} deleteTask={deleteTask} completeTask={completeTask} />
      </main>
    </Provider>
  )
}