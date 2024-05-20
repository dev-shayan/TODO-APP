import React from 'react'
import { ModeToggle } from '../ui/mode-toggle'

export default function Navbar() {
  return (
    <main>
    <div className='absolute top-1 right-1'>
        <ModeToggle/>
    </div>
    <div>
        <h1 className='text-3xl font-bold text-center'>TODO APP</h1>
    </div>
    </main>
  )
}
