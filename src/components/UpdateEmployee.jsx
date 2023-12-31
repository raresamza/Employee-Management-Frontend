import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';
import { bolt } from '../icons';
import Bolt from '../icons/bolt.svg?react'
import { motion } from "framer-motion"
const UpdateEmployee = () => {

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 40, transition: { duration: 0.2 } }
  };

  const itemVariantsDept = {
    openDept: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closedDept: { opacity: 0, y: 40, transition: { duration: 0.2 } }
  };


  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDepartment, setIsOpenDepartment] = useState(false);

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
    console.log(employee.role)
    console.log(employee.description)
    setEmployee({ ...employee, [e.target.name]: value })
  }



  const [employee, setEmployee] = useState({
    id: id,
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    description: "",
  })


  const handleRole = (e) => {
    console.log(employee.role)
    employee.role = e.target.name
    setIsOpen(false)
    setEmployee({ ...employee, [employee.role]: e.target.name })
  }

  const handleDept = (e) => {
    setIsOpenDepartment(false)
  }

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
        <div>
          <textarea placeholder='Add extra employee information...' name='description' value={employee.description} spellCheck={true} className='w-full rounded-lg text-sm outline-none h-28 resize-none border-2 border-black px-4 py-4 mb-1' onChange={(e) => handleChange(e)}></textarea>
        </div>
        {/* problem here fix this,, copy paste all in between two divs */}
        {/* <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className="menu"
        > */}
        {/* HERE IS TOP */}
        <div className='flex items-center justify-between'>
          <div className='mr-10'>
            <motion.nav
              initial={false}
              animate={isOpen ? "open" : "closed"}
              className="menu"
            >
              <motion.button className='flex justify-between items-center w-56 text-lg px-2 mb-3 rounded-lg border-2 border-black'
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
              <motion.ul className='flex flex-col gap-[10px] border-black border-2 p-2 rounded-lg'
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
                <motion.button value="INTERN" name='INTERN' className='hover:font-bold cursor-pointer text-left w-full' variants={itemVariants} onClick={(e) => handleRole(e)}>INTERN </motion.button>
                <motion.button value="JUNIOR" name='JUNIOR' className='hover:font-bold cursor-pointer text-left w-full' variants={itemVariants} onClick={(e) => handleRole(e)}>JUNIOR </motion.button>
                <motion.button value="MID_DEV" name="MID_DEV" className='hover:font-bold cursor-pointer text-left w-full' variants={itemVariants} onClick={(e) => handleRole(e)}>MID_DEV </motion.button>
                <motion.button value="SENIOR_DEV" name="SENIOR_DEV" className='hover:font-bold cursor-pointer text-left w-full' variants={itemVariants} onClick={(e) => handleRole(e)}>SENIOR_DEV</motion.button>
                <motion.button value="PROJECT_MANAGER" name="PROJECT_MANAGER" className='hover:font-bold cursor-pointer text-left w-full' variants={itemVariants} onClick={(e) => handleRole(e)}>PROJECT_MANAGER</motion.button>
              </motion.ul>
            </motion.nav>
          </div>
          <div>
            {/* needs fix */}
            <motion.nav
              initial={false}
              animate={isOpenDepartment ? "openDept" : "closedDept"}
              className="menuDept"
            >
              <motion.button className='flex justify-between items-center w-56 text-lg px-2 mb-3 rounded-lg border-2 border-black'
                whileTap={{ scale: 0.97 }}
                onClick={() => { setIsOpenDepartment(!isOpenDepartment), console.log(isOpenDepartment) }}
              >
                Choose Department
                <motion.div
                  variants={{
                    openDept: { rotate: 180 },
                    closedDept: { rotate: 0 }
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ originY: 0.55 }}
                >
                  <svg width="15" height="15" viewBox="0 0 20 20">
                    <path d="M0 7 L 20 7 L 10 16" />
                  </svg>
                </motion.div>
              </motion.button>
              <motion.ul className='flex flex-col gap-[10px] border-black border-2 p-2 rounded-lg'
                variants={{
                  openDept: {
                    clipPath: "inset(0% 0% 0% 0% round 10px)",
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 0.7,
                      delayChildren: 0.3,
                      staggerChildren: 0.05
                    }
                  },
                  closedDept: {
                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 1.6
                    }
                  }
                }}
                style={{ pointerEvents: isOpenDepartment ? "auto" : "none" }}
                >
                <motion.button value="INTERN" name='INTERN' className='hover:font-bold cursor-pointer text-left w-full' variants={itemVariantsDept} onClick={(e) => handleDept(e)}>IT </motion.button>
                <motion.button value="JUNIOR" name='JUNIOR' className='hover:font-bold cursor-pointer text-left w-full' variants={itemVariantsDept} onClick={(e) => handleDept(e)}>AC </motion.button>
                <motion.button value="MID_DEV" name="MID_DEV" className='hover:font-bold cursor-pointer text-left w-full' variants={itemVariantsDept} onClick={(e) => handleDept(e)}>SUP </motion.button>
                <motion.button value="SENIOR_DEV" name="SENIOR_DEV" className='hover:font-bold cursor-pointer text-left w-full' variants={itemVariantsDept} onClick={(e) => handleDept(e)}>QA</motion.button>
                <motion.button value="PROJECT_MANAGER" name="PROJECT_MANAGER" className='hover:font-bold cursor-pointer text-left w-full' variants={itemVariantsDept} onClick={(e) => handleDept(e)}>SLS</motion.button>
              </motion.ul>
            </motion.nav>
          </div>
        </div>
        {/*  */}
        {/* </motion.nav> */}
      </div>
    </div>

  )
}

export default UpdateEmployee