import React from 'react'
import { useState } from 'react'
import DepartmentService from '../services/DepartmentService'
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {

  const nav=useNavigate()


  const [department, setDepartment] = useState({
    name: "",
    code: "",
  })

  const handleChange = (e) => {
    const value=e.target.value;
    console.log(department.name)
    console.log(department.code)
    setDepartment({ ...department, [e.target.name]: value })
}


  const saveDepartment = (e) => {
    e.preventDefault();
    DepartmentService.saveDepartment(department).then((response) => {
      console.log(response)
      nav("/employeeList")
    }).catch((error) => {
      console.log(error)
    })
  }

  const clear = (e) => {
    e.preventDefault()
    setDepartment({
        name:"",
        code:"",
    });
}


  return (
    <div className='flex items-center justify-center max-w-2xl mx-auto'>
      <div className='p-8'>
        <div className='text-3xl font-extralight  tracking-wider'>
          <h1>Add New Department</h1>
        </div>
        <div className='h-14 w-full my-4 mt-10'>
          <label className='block text-gray-600 text-xl font-normal rounded-lg'>Department Name </label>
          <input type='text' name='name' value={department.name} onChange={(e) => handleChange(e)} className='border h-10 w-96 mt-2 p-2 rounded-lg' />
        </div>
        <div className='  h-14 w-full mb-5'>
          <label className='block text-gray-600 text-xl font-normal '>Department Code</label>
          <input type='text' name='code' value={department.code} onChange={(e) => handleChange(e)} className='border h-10 w-96 mt-2 p-2 rounded-lg' />
        </div>
        <div className='items-center justify-center h-14 w-full my-4 space-x-4 pt-4'>
          <button className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6' onClick={saveDepartment}>Save</button>
          <button className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6' onClick={clear}>Clear</button>
        </div>
      </div>
    </div>
  )
}

export default AddDepartment