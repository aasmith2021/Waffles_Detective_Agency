import axios from 'axios';

export default {
    getAnimalData() {
        return axios.get('animals/random/9');
    }
}