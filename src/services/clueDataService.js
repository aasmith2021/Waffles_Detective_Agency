import axios from 'axios';

export default {
    getClueData() {
        return axios.get('ClueData.json');
    }
}