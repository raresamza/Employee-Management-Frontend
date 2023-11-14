import React from 'react'
import { useEffect,useState } from 'react'

const DropdownMenu = (props) => {

    const [open, setOpen] = useState(false)

    useEffect(() => {
      
    
      return () => {
      }
    }, [])
    
  return (
    <>
    <button className='border-2 border-black rounded-lg text-lg px-4 h-12 mt-' onClick={()=>setOpen(!open)}>
        Select role
    </button>
    {open && props.children}
    </>
  )  
}

export default DropdownMenu