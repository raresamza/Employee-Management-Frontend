import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';
import { bolt } from '../icons';
import Bolt from '../icons/bolt.svg?react'
import {motion} from "framer-motion"
const UpdateEmployee = () => {

    const itemVariants = {
        open: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, y: 40, transition: { duration: 0.2 } }
      };
      

    const [isOpen, setIsOpen] = useState(false);

    const { id } = useParams();
    const nav = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EmployeeService.getEmployeeByID(id);
                setEmployee(response.data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchData()
    }, [])


    const handleChange = (e) => {
        const value = e.target.value;
        console.log(employee.firstName)
        console.log(employee.lastName)
        console.log(employee.email)
        setEmployee({ ...employee, [e.target.name]: value })
    }

    const [employee, setEmployee] = useState({
        id: id,
        firstName: "",
        lastName: "",
        email: "",
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
                {/* <div className='mb-4'>
                    <p className='text-xl'>Select Role</p>
                    <select className='border-2 border-slate-400 focus:border-black text-lg rounded-lg px-1'>
                        <option className=' rounded-lg' value="rigatoni">INTERN</option>
                        <option value="dave">JUNIOR</option>
                        <option value="pumpernickel">DEVELOPER</option>
                        <option value="reeses">MID_DEV</option>
                        <option value="reeses">SENIOR_DEV</option>
                        <option value="reeses">PROJECT_MANAGER</option>
                    </select>
                </div> */}
                {/* <DropdownMenu>
                    <div className='border-2 border-black my-2 rounded-lg'>
                    <DropdownItem >
                        {<Bolt className="w-8 h-8 rounded-full"/>}
                        <p>x</p>
                    </DropdownItem>
                    <DropdownItem >
                        {<Bolt className="w-8 h-8 rounded-full"/>}
                        <p>x</p>
                    </DropdownItem>
                    </div>
                </DropdownMenu> */}
                <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="menu"
    >
      <motion.button className='flex justify-between items-center w-44 text-lg px-2 mb-3 rounded-lg border-2 border-black'
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Choose Role
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 }
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.div>
      </motion.button>
      <motion.ul className='flex flex-col gap-[10px] border-black border-2 p-2 rounded-lg '
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 1.6
            }
          }
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.li className='hover:font-bold cursor-pointer' variants={itemVariants}>INTERN </motion.li>
        <motion.li className='hover:font-bold cursor-pointer' variants={itemVariants}>JUNIOR </motion.li>
        <motion.li className='hover:font-bold cursor-pointer' variants={itemVariants}>MID_DEV </motion.li>
        <motion.li className='hover:font-bold cursor-pointer' variants={itemVariants}>SENIOR_DEV</motion.li>
        <motion.li className='hover:font-bold cursor-pointer' variants={itemVariants}>PROJECT_MANAGER</motion.li>
      </motion.ul>
    </motion.nav>
            </div>
        </div>
        
    )
}

export default UpdateEmployee