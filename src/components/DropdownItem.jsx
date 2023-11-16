import React from 'react'

const DropdownItem = ( props ) => {
    console.log(props.children)
  return (
        <>
        {/*className="menu-item" */}
        <button className='flex py-1 items-center hover:text-white hover:bg-blue-700' onClick={() => console.log("hello")}>
          <span >{props.children.LeftIcon} </span>
          {props.children}
          
        </button>
      </>
  )
}

export default DropdownItem