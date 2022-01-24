import { useState } from 'react'
import { Provider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import Form from './components/Form'
import ListOfTasks from './components/ListOfTasks'
import Wallet from './components/Wallet'

import getUniqueId from './utils/getUniqueId'
import getMessage from './utils/getMessage'

//TODO: Add WalletConnect
const connectors = () => {
  return [ new InjectedConnector() ]
}

export default function App () {
  const localtasks = JSON.parse(localStorage.getItem('localtasks')) || [
    { id: getUniqueId(), text: "Start here", date: Date.now(), state: false },
  ]

  const [tasks, setTasks] = useState(localtasks)
  const sortedTasks = tasks.slice().sort((a, b) => a.date - b.date)

  const addTask = (text) => {
    const newTask = {
      id: getUniqueId(),
      text: text,
      date: Date.now(),
      state: false,
    }
    localStorage.setItem('localtasks', JSON.stringify([...sortedTasks, newTask]))
    setTasks([...sortedTasks, newTask])
  }

  const deleteTask = (id) => {
    const remainingTasks = sortedTasks.filter((task) => task.id != id)
    localStorage.setItem('localtasks', JSON.stringify(remainingTasks))
    setTasks(remainingTasks)
  }

  const completeTask = (task, text, date, state) => {
    const activeTasks = sortedTasks.filter(e => e.id != task.current.id)
    const completedTask = {id: task.current.id, text: text, date: date, state: !state}
    localStorage.setItem('localtasks', JSON.stringify([...activeTasks, completedTask]))
    setTasks([...activeTasks, completedTask])
  }

  return (
    <Provider autoConnect connectors={connectors}>
      <main className="mx-auto max-w-3xl md:min-h-screen flex flex-col items-center justify-center">
        <header className="w-11/12 md:w-3/4 flex flex-row items-center py-6 select-none">
          <img
            src="https://emojicdn.elk.sh/👋?style=apple"
            alt="Waving hand sign emoji"
            className="w-8 h-8 mr-4"
          />
          <h1 className="text-2xl text-gray-600 font-bold">{getMessage()}</h1>
          <Wallet />
        </header>
        <Form addTask={addTask} />
        <ListOfTasks
          sortedTasks={sortedTasks}
          deleteTask={deleteTask}
          completeTask={completeTask}
        />
      </main>
    </Provider>
  )
}