import animalDataService from '../../services/animalDataService.js';
import clueDataService from '../../services/clueDataService.js';
import clueDataSetup from './clueDataSetup.js';

const getSuspectsAndClues = async function() {
    const suspectAndClueData = {
        suspects: [],
        currentSuspects: [],
        thief: '',
        clues: [],
    }

    const allAnimalsResponse = await animalDataService.getAnimalData();
    const allClueDataResponse = await clueDataService.getClueData();
    const allAnimals = allAnimalsResponse.data.animals;
    const clueData = allClueDataResponse.data.clues;
    const numberOfSuspects = 9;
    const suspects = [];

    for (let i = 0; i < numberOfSuspects; i++) {
        const randomIndexFromAllAnimals = Math.floor(Math.random() * allAnimals.length);
        suspects.push(allAnimals[randomIndexFromAllAnimals]);
        allAnimals.splice(randomIndexFromAllAnimals, 1);
    }

    const currentSuspects = [...suspects];

    const randomIndexFromSuspects = Math.floor(Math.random() * suspects.length);
    const thief = suspects[randomIndexFromSuspects];

    suspectAndClueData.suspects = suspects;
    suspectAndClueData.currentSuspects = currentSuspects;
    suspectAndClueData.thief = thief;

    const allClues = [];
    const selectedClues = [];

    const scrambledLatinName = {
        type: 'latinName',
        clue: ''
    }
    scrambledLatinName.clue = clueDataSetup.getScrambledLatinName(thief);
    allClues.push(scrambledLatinName);

    allClues.push(clueDataSetup.getAnimalTypeClue(clueData, thief));
    allClues.push(clueDataSetup.getActiveTimeClue(clueData, thief));
    allClues.push(clueDataSetup.getLengthClue(clueData, thief));
    allClues.push(clueDataSetup.getWeightClue(clueData, thief));
    allClues.push(clueDataSetup.getHabitatClue(clueData, thief));

    while (selectedClues.length < 5) {
        const randomIndexFromAllClues = Math.floor(Math.random() * allClues.length);

        const randomClue = allClues[randomIndexFromAllClues];
        selectedClues.push(randomClue);
        allClues.splice(randomIndexFromAllClues, 1);
    }

    suspectAndClueData.clues = selectedClues;

    return suspectAndClueData;
};

export default {
    getSuspectsAndClues
}