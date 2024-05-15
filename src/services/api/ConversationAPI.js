import axios from '../../config/axiosBaseUrl/axios';

const ConversationAPI = {
    getAll: async () => {
        try {
            const data = await axios.get('/conversation/get-all-conversation');
            return data.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    acceptConversation: async (conversation_id) => {
        try {
            const result = await axios.put('/conversation/accept/'+conversation_id);
            return result.status;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default ConversationAPI;
