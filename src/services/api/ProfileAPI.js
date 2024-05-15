import axios from '../../config/axiosBaseUrl/axios';


const ProfileAPI = {
    getProfile: async () => {
        try {
            const result = await axios.get('/profile');
            return result.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default ProfileAPI;
