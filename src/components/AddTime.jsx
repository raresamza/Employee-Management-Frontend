import React, { useState, useEffect } from 'react'
import EmployeeService from '../services/EmployeeService'
import { useLocation } from 'react-router-dom'


const AddTime = () => {

    const { state } = useLocation()

    const [count, setCount] = useState(0)

    const [employee, setEmployee] = useState(null)

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        // console.log(id)
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await EmployeeService.getEmployeeByID(state)
                console.log(response)
                setEmployee(response.data)
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData()
    }, [])

    const increaseCount = () => {
        console.log(state)
        // clg(employee)
        if (count < 12) {
            setCount(count + 1)
        }
    }

    const decreaseCount = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    const edit = (e) => {
        e.preventDefault()
        employee.workedHours=count+employee.workedHours
        // console.log(employee.workedHours)
        // console.log(employee)
        setCount(0)
        EmployeeService.updateEmployee(state, employee)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
    }

    return (
        <>
        {!loading && (
            <div className='flex items-center justify-center text-4xl font-semibold mt-16'>Edit time spent working for employee {employee.lastName} {employee.firstName}</div>)}
            <div className='h-[calc(100vh-4rem)] flex items-center justify-center'>
                <div>
                    <div className='flex justify-center items-center text-2xl gap-10 '>
                        <button className='rounded-md h-16 w-16 bg-slate-400 text-white b border-black border-2' onClick={decreaseCount}>-</button>
                        <p className='text-4xl font-semibold'>{count}</p>
                        <button className='rounded-md h-16 w-16 bg-slate-400 text-white b border-black border-2' onClick={increaseCount}>+</button>
                    </div>
                    <div className='flex justify-center items-center my-10'>
                    <button className='bg-green-500 hover:bg-green-600 cursor-pointer text-xl p-3 rounded-2xl w-40 font-semibold text-white' onClick={(e)=>edit(e)}>Edit</button>
                </div>
                </div>
                
            </div>


        </>
    )
}

export default AddTime