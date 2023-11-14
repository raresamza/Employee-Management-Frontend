import React from 'react'

const DropdownItem = ( props ) => {
    console.log(props.children)
  return (
        <>
        {/*className="menu-item" */}
        <a href="#"  className='flex py-1 items-center hover:text-white hover:bg-blue-700' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          <span >{props.children.LeftIcon} </span>
          {props.children}
          
        </a>
      </>
  )
}

export default DropdownItem