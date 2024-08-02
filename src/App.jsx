import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useAuthStore from '@zustand/authStore'
import { useSocketSetup } from '@zustand/socketStore'

function App() {
  const [count, setCount] = useState(0)

  useEffect(()=>{
    useSocketSetup();
    console.log("이건되지?")
  },[])
  

  return (
    <>
      <button className="btn">Button</button>
      
    </>
  )
}

export default App
