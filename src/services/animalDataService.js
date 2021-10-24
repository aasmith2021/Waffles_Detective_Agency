import axios from 'axios';

export default {
    getSuspects(numberOfSuspects) {
        return axios.get(`/animals/rand/${numberOfSuspects}`);
    }
}