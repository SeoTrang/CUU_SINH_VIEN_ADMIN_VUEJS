import axios from 'axios';
import Cookies from "js-cookie";
import { accessToken, refreshToken } from "../../constant/constant";

const AuthAPI = {
    login: async (email,password) => {
        try {
            let result = null;
            let status = null;
            
            const api = import.meta.env.VITE_API_URL;
            await axios.post(`${api}/api/auth/admin/login`,{data: {email: email,pass: password}})
            .then((res) => {
                
                console.log(res);
                result = res.data;
                status = res.status;
            })
            .catch((err) => {
                console.log(err);
                status = err.response.status;
            })

            if(result) {
                let accessToken1 = result.accessToken;
                let refreshToken1 = result.refreshToken;
                Cookies.set(accessToken,accessToken1);
                Cookies.set(refreshToken,refreshToken1);
                return status;
            }
            return status;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    logout: async () => {
        try {
            let result = null;
            await axios.post('/auth/logout')
            .then(res=>{
                result = res.status;
            })
            .catch(err=>{
                console.log(err);
            })
            if(result == 200) return true;
            return false;

        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default AuthAPI;
