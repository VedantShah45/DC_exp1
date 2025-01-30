import React from 'react'
import Hero from './components/Hero'
import { ToastContainer } from 'react-toastify'

const page = () => {
  return (
    <div>
      <Hero />
      <ToastContainer />
    </div>  
  )
}

export default page