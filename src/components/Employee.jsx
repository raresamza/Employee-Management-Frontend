import React from 'react'
import { useNavigate } from 'react-router-dom'

const Employee = ({ employee, deleteEmployee }) => {

    const nav=useNavigate();

    const editEmployee = (e, id) => {
        e.preventDefault()
        nav(`/updateEmployee/${employee.id}`);
    }

    return (
        <tr>
            <td className='text-left px-6 py-4 whitespace-nowrap'><div className='text-sm text-gray-500'>{employee.firstName}</div></td>
            <td className='text-left px-6 py-4 whitespace-nowrap'><div className='text-sm text-gray-500'>{employee.lastName}</div></td>
            <td className='text-left px-6 py-4 whitespace-nowrap'><div className='text-sm text-gray-500'>{employee.email}</div></td>
            <td className='text-right px-6 py-4 whitespace-nowrap font-medium text-sm'>
                <a className='text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer' onClick={(e, id) => editEmployee(e, id)} >Edit</a>
                <a className='text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4'onClick={() => nav(`/addTime/${employee.id}`, {state: employee.id })} >Add Time</a>
                <a className='text-indigo-600 hover:text-indigo-800 hover:cursor-pointer' onClick={(e, id) => deleteEmployee(e, employee.id)}>Delete</a>
            </td>
        </tr>
    )
}

export default Employee