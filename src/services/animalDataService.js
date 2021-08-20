import axios from 'axios';

export default {
    getAnimalData() {
        return axios.get('AnimalData.json')
    }
}