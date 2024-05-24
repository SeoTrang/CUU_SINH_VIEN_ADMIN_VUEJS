import axios from 'axios';

const AddressAPI = {
    getAll: async () => {
        try {
            const api = import.meta.env.VITE_API_URL;
            const result = await axios.get(api+ '/api/all-address')
            return result.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}


export default AddressAPI;
