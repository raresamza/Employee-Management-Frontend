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
        return axios.get(EMPLOYEE_BASE_URL+"/"+id)
    }

    updateEmployee(id,employee) {
        return axios.put(EMPLOYEE_BASE_URL+"/update/"+id,employee)
    }

    saveDepartment(department) {
        return axios.post(DEPARTMENT_BASE_URL+"/add",department)
    }
}
export default new EmployeeService();