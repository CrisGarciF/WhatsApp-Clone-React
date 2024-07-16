import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import Messages from './components/Messages'
import { supabase } from './supabaseClient'

function App() {

  const [session, setSession] = useState(null)

  const getSeccion = async () => {
    const { data } = await supabase.auth.getSession()
    setSession(data.session)
  }

  useEffect(() => {
      getSeccion()
  }, [])

  return (
    <div className='App'>
      <h1>Whatsapp Clone</h1>
      <p>ReactJs & Supabase</p>
      { session ? <Messages /> : <Login /> }
    </div>
  )
}

export default App
