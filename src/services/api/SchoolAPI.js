import axios from "../../config/axiosBaseUrl/axios";


const SchoolAPI = {
    getAll: async () => {
        try {
            const data = await axios.get('/school/get-all-schools')
            return data.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    acceptSchool: async (conversation_id) => {
        try {
            const result = await axios.put('/school/accept/'+conversation_id);
            return result.status;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default SchoolAPI;
