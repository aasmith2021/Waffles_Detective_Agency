// import axios from 'axios';
import allSuspects from '../../database/animalData.json';

export default {
  getSuspects (numberOfSuspects) {
    const gameSuspects = [];
      
    for (let i = 0; i < numberOfSuspects; i++) {
      const currentGameSuspectsLength = gameSuspects.length;
  
      while (gameSuspects.length === currentGameSuspectsLength) {
        const randomIndex = Math.floor(Math.random() * allSuspects.length);
        if (!gameSuspects.includes(allSuspects[randomIndex])) {
          gameSuspects.push(allSuspects[randomIndex]);
        }
      }
    }
  
    return gameSuspects;
  },
};