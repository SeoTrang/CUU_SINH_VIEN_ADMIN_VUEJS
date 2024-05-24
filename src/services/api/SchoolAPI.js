import axios from "../../config/axiosBaseUrl/axios";

const SchoolAPI = {
    getAll: async () => {
        try {
            const data = await axios.get('/admin/school/get-all-schools')
            return data.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    acceptSchool: async (conversation_id) => {
        try {
            const result = await axios.put('/admin/school/accept/'+conversation_id);
            return result.status;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    create: async (props) => {
        try {
            const {name, address_id} = props;
            let data = {
                name,
                address_id
            }
            const result = await axios.post('/school',{data: data})
            return result.status;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    getSchoolByAddress: async (address_id) => {
        try {
            let result = await axios.get('/admin/school/get-by-address?address='+address_id);
            return result.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default SchoolAPI;
