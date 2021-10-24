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

    const NUMBER_OF_SUSPECTS = 9;
    let suspectsData;
    try {
        suspectsData = await animalDataService.getSuspects(NUMBER_OF_SUSPECTS);
    } catch (e) {
        console.log(e);
    }
    const suspects = suspectsData.data;
    // Changes the keys of each suspect from the column
    // names from the database to the camelCase of the app
    suspects.forEach((suspect) => {
        delete Object.assign(suspect, {['latinName']: suspect['latin_name'] })['latin_name'];
        delete Object.assign(suspect, {['animalType']: suspect['animal_type'] })['animal_type'];
        delete Object.assign(suspect, {['activeTime']: suspect['active_time'] })['active_time'];
        delete Object.assign(suspect, {['lengthMin']: suspect['length_min'] })['length_min'];
        delete Object.assign(suspect, {['lengthMax']: suspect['length_max'] })['length_max'];
        delete Object.assign(suspect, {['weightMin']: suspect['weight_min'] })['weight_min'];
        delete Object.assign(suspect, {['weightMax']: suspect['weight_max'] })['weight_max'];
        delete Object.assign(suspect, {['range']: suspect['geo_range'] })['geo_range'];
        delete Object.assign(suspect, {['image']: suspect['image_link'] })['image_link'];
    });
    console.log(suspects);
    const allClueDataResponse = await clueDataService.getClueData();
    const clueData = allClueDataResponse.data.clues;

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