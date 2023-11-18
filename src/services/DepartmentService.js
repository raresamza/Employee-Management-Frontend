import axios from 'axios'

const DEPARTMENT_BASE_URL='http://localhost:8080/api/v1/department'

class DepartmentService {
    saveDepartment(department) {
        return axios.post(DEPARTMENT_BASE_URL+"/add",department)
    }
}
export default new DepartmentService();