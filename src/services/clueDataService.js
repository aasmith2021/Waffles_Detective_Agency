import axios from 'axios';

const clueServiceAxios = axios.create();

export default {
    getClueData() {
        return clueServiceAxios.get('ClueData.json');
    }
}