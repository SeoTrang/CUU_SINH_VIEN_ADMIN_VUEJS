
import axios from '../../config/axiosBaseUrl/axios';

const UserAPI = {
    getAllUser: async () => {
        try {
            let users = await axios.get('/admin/user/all-users')
            console.log(users.data);
            return users.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    
}

export default UserAPI;
