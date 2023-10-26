import React, {useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';

const UpdateEmployee = () => {

    const {id}=useParams();
    const nav = useNavigate();
    useEffect(() => {
      const fetchData = async() =>{
        try {
            const response=await EmployeeService.getEmployeeByID(id);
            setEmployee(response.data)
        }catch(error) {
            console.log(error)
        }
      };
      fetchData()
    }, [])
    

    const handleChange = (e) => {
        const value=e.target.value;
        console.log(employee.firstName)
        console.log(employee.lastName)
        console.log(employee.email)
        setEmployee({ ...employee, [e.target.name]: value })
    }

    const [employee, setEmployee] = useState({
        id:id,
        firstName:"",
        lastName:"",
        email:"",
    })
    const updateEmployee = (e) => {
        e.preventDefault()
        EmployeeService.updateEmployee(id, employee)
      .then((response) => {
        nav("/employeeList");
      })
      .catch((error) => {
        console.log(error);
      });
    }

    return (
        <div className='flex max-w-2xl shadow border-b mx-auto'>
            <div className='p-8'>
                <div className='text-2xl font-extralight  tracking-wider'>
                    <h1>Edit Employee</h1>
                </div>
                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className='block text-gray-600 text-sm font-normal'> First Name </label>
                    <input type='text' name='firstName' value={employee.firstName} onChange={(e) => handleChange(e)} className='border h-10 w-96 mt-2 p-2' />
                </div>
                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className='block text-gray-600 text-sm font-normal'> Last Name </label>
                    <input type='text' name='lastName' value={employee.lastName} onChange={(e) => handleChange(e)} className='border h-10 w-96 mt-2 p-2' />
                </div>
                <div className='items-center justify-center h-14 w-full my-4'>
                    <label className='block text-gray-600 text-sm font-normal'> Email </label>
                    <input type='email' name='email' value={employee.email} onChange={(e) => handleChange(e)} className='border h-10 w-96 mt-2 p-2' />
                </div>
                <div className='items-center justify-center h-14 w-full my-4 space-x-4 pt-4'>
                    <button className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6' onClick={updateEmployee}>Update</button>
                    <button className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6' >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateEmployee