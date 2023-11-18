import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';
import Employee from './Employee';
import { PDFViewer,PDFDownloadLink } from '@react-pdf/renderer';
import { ReactDOM } from 'react';
import PDF from './PDF';


const EmployeeList = () => {


    const nav = useNavigate();

    const [employees, setEmployees] = useState(null)

    const [loading, setLoading] = useState(true)
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await EmployeeService.getEmployeesWithID()
                console.log(response)
                setEmployees(response.data)
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData()
    }, [])

    const deleteEmployee = (e, id) => {
        e.preventDefault()
        EmployeeService.deleteEmployee(id).then((response) => {
            if (employees) {
                setEmployees((prevElement) => {
                    return prevElement.filter((employee) => employee.id !== id)
                })
            }
        })
    }

    return (
        <>
            <div className='container mx-auto my-8'>
                <div className='h-12 flex justify-between items-center mb-10'>
                    <button className='rounded bg-slate-600 text-white px-6 py-2 font-semibold' onClick={() => nav("/addEmployee")}>Add Employee</button>
                    <button className='rounded bg-slate-600 text-white px-6 py-2 font-semibold' onClick={() => nav("/addDepartment")}>Add Department</button>
                </div>
                <div className='flex shadow border-b'>
                    <table className='min-w-full'>
                        <thead className='bg-gray-50'>
                            <tr >
                                <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>First Name</th>
                                <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Last Name</th>
                                <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Email</th>
                                <th className='text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Actions</th>
                            </tr>
                        </thead>
                        {!loading && (
                            <tbody className='bg-white'>
                                {employees.map((employee, index) => (
                                    <Employee employee={employee} deleteEmployee={deleteEmployee} key={index}></Employee>
                                    // ,console.log(index)
                                ))}
                            </tbody>)}
                    </table>

                </div>
            </div>
            <div className='items-center flex justify-center my-5'>
            <PDFDownloadLink document={<PDF />} filename="FORM">
                    {({ loading }) => (loading ? <button className='bg-red-400 hover:bg-red-800 text-xl p-3 rounded-2xl'>Loading Document...</button> : <button className='bg-green-400 hover:bg-green-800 cursor-pointer text-xl p-3 rounded-2xl'>Download</button>)}
                </PDFDownloadLink>
            </div>
            <div className='items-center flex justify-center mb-10'>
                
                <PDFViewer height={600} showToolbar={false} width="75%">
                    <PDF />
                </PDFViewer>
            </div>
        </>
    )
}

export default EmployeeList