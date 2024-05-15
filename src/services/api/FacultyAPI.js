import axios from '../../config/axiosBaseUrl/axios';

const FacultyAPI = {
    getAll: async () => {
        try {
            const result = await axios.get('/faculty/get-all-faculty')
            if(result.status >= 200 && result.status < 300) return result.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    acceptFaculty: async (faculty_id) => {
        try {
            const result = await axios.put('/faculty/accept/'+faculty_id);
            return result.status;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default FacultyAPI;
