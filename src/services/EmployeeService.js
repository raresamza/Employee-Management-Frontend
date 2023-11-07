import axios from "axios";

const EMPLOYEE_BASE_URL='http://localhost:8080/api/v1/employee'

class EmployeeService {
    saveEmployee(employee) {
        return axios.post(EMPLOYEE_BASE_URL+"/add",employee)
    }
    getEmployees() {
        return axios.get(EMPLOYEE_BASE_URL)
    }
    getEmployeesWithID() {
        return axios.get(EMPLOYEE_BASE_URL+"/with")
    }
    deleteEmployee(id) {
        return axios.delete(EMPLOYEE_BASE_URL+"/"+id);
    }

    getEmployeeByID(id) {
        console.log(EMPLOYEE_BASE_URL+"/"+id)
        return axios.get(EMPLOYEE_BASE_URL+"/"+id)
    }

    updateEmployee(id,employee) {
        return axios.put(EMPLOYEE_BASE_URL+"/update/"+id,employee)
    }
}
export default new EmployeeService();