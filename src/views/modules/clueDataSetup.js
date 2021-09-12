const getScrambledLatinName = (thief) => {
    let latinNameSplit = thief.latinName.split(' ');
    let scrambledLatinName = '';
    
    for (let i = 0; i < latinNameSplit.length; i++) {
      let currentWord = latinNameSplit[i];

      for (let j = 0; j < 100; j++) {
        const randomIndexOfChar = Math.floor(Math.random() * currentWord.length);

        const randomChar = currentWord.charAt(randomIndexOfChar);
        const charactersBeforeRandomChar = currentWord.substring(0, randomIndexOfChar);
        let charactersAfterRandomChar = '';

        if (randomIndexOfChar != currentWord.length - 1) {
          charactersAfterRandomChar = currentWord.substring(randomIndexOfChar + 1);
        }

        currentWord = charactersBeforeRandomChar + charactersAfterRandomChar + randomChar;
      }
      
      currentWord = currentWord.toLowerCase();

      scrambledLatinName += currentWord;

      if (i < latinNameSplit.length - 1) {
        scrambledLatinName += ' ';
      }
    }

    return scrambledLatinName;
};

const getAnimalTypeClue = (clueData, thief) => {
    const randomIndexBetween0And2 = Math.floor(Math.random() * 3);
    let animalTypeClue = {
      type: 'animalType',
      clue: ''
    }

    switch(thief.type.toLowerCase()) {
      case 'mammal': {
        animalTypeClue.clue = clueData.type.mammal[randomIndexBetween0And2];
        break;
      }
      case 'bird': {
        animalTypeClue.clue = clueData.type.bird[randomIndexBetween0And2];
        break;
      }
      case 'reptile': {
        animalTypeClue.clue = clueData.type.reptile[randomIndexBetween0And2];
        break;
      }
      case 'marsupial': {
        animalTypeClue.clue = clueData.type.marsupial[randomIndexBetween0And2];
        break;
      }
      default: {
        animalTypeClue.clue = '?';
      }
    }

    return animalTypeClue;
};

const getActiveTimeClue = (clueData, thief) => {
    const randomIndexBetween0And2 = Math.floor(Math.random() * 3);
    let activeTimeClue = {
      type: 'activeTime',
      clue: ''
    }

    switch(thief.activeTime.toLowerCase()) {
      case 'nocturnal': {
        activeTimeClue.clue = clueData.activeTime.nocturnal[randomIndexBetween0And2];
        break;
      }
      case 'diurnal': {
        activeTimeClue.clue = clueData.activeTime.diurnal[randomIndexBetween0And2];
        break;
      }
      default: {
        activeTimeClue.clue = '?';
      }
    }

    return activeTimeClue;
};

const getLengthClue = (clueData, thief) => {
    const randomIndexBetween0And2 = Math.floor(Math.random() * 3);
    let lengthClue = {
      type: 'length',
      clue: ''
    }

    if (thief.lengthMax <= 1.5) {
      lengthClue.clue = clueData.length.short[randomIndexBetween0And2];
    } else if (thief.lengthMax <= 3.5) {
      lengthClue.clue = clueData.length.medium[randomIndexBetween0And2];
    } else if (thief.lengthMax <= 10) {
      lengthClue.clue = clueData.length.long[randomIndexBetween0And2];
    } else {
      lengthClue.clue = clueData.length.veryLong[randomIndexBetween0And2];
    }

    return lengthClue;
};

const getWeightClue = (clueData, thief) => {
    const randomIndexBetween0And2 = Math.floor(Math.random() * 3);
    let weightClue = {
      type: 'weight',
      clue: ''
    }

    const thiefWeightAverage = (thief.weightMin + thief.weightMax) / 2;

    if (thiefWeightAverage <= 16) {
      weightClue.clue = clueData.weight.small[randomIndexBetween0And2];
    } else if (thiefWeightAverage <= 22) {
      weightClue.clue = clueData.weight.medium[randomIndexBetween0And2];
    } else if (thiefWeightAverage <= 75) {
      weightClue.clue = clueData.weight.large[randomIndexBetween0And2];
    } else {
      weightClue.clue = clueData.weight.veryLarge[randomIndexBetween0And2];
    }

    return weightClue;
};

const getLifespanClue = (clueData, thief) => {
    const randomIndexBetween0And2 = Math.floor(Math.random() * 3);
    let lifespanClue = {
      type: 'lifespan',
      clue: ''
    }

    if (thief.lifespan <= 10) {
      lifespanClue.clue = clueData.lifespan.short[randomIndexBetween0And2];
    } else if (thief.lifespan <= 20) {
      lifespanClue.clue = clueData.lifespan.medium[randomIndexBetween0And2];
    } else {
      lifespanClue.clue = clueData.lifespan.long[randomIndexBetween0And2];
    }

    return lifespanClue;
};

const getHabitatClue = (clueData, thief) => {
    const thiefHabitat = thief.habitat.toLowerCase();
    let habitatClue = {
      type: 'habitat',
      clue: ''
    }

    if (thiefHabitat.includes('land')
      || thiefHabitat.includes('forest')) {
      habitatClue.clue = clueData.habitat[0];
    } else if (thiefHabitat.includes('lake')
      || thiefHabitat.includes('river')
      || thiefHabitat.includes('water')) {
      habitatClue.clue = clueData.habitat[1];
    } else {
      habitatClue.clue = clueData.habitat[2];
    }

    return habitatClue;
};

export default {
    getScrambledLatinName,
    getAnimalTypeClue,
    getActiveTimeClue,
    getLengthClue,
    getWeightClue,
    getLifespanClue,
    getHabitatClue
}