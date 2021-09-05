<template>
  <v-app
    id="app"
    class='set-app-background-to-black'  
  >
    <v-app-bar
      app
      color="primary"
      dark
      v-show="$store.state.startPageFinished && !$store.state.exitGame"
    >
    
      <v-card
        :elevation="0"
        class="d-flex flex-row mx-1 align-center"
        color="transparent"
      >
        <v-img
          src="./assets/waffles_3.jpg"
          width="50px"
          class="rounded-0 mr-4"
          contain
        >
        </v-img>
        <v-card-text
          class="text-h4 white--text"
          v-show="$vuetify.breakpoint.name != 'xs'"
        >
          Waffles' Detective Agency
        </v-card-text>
        <v-card-text
          class="white--text text-h4"
          v-show="$vuetify.breakpoint.name === 'xs'"
        >
          W.D.A.
        </v-card-text>
      </v-card>
      
      <v-spacer></v-spacer>
    
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="secondary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <template>
          <v-list
            class="mt-12"
          >
            <v-list-item
              v-for="(item, index) in menuItems"
              v-bind:key="index"
              @click="routeToPage(item)"
            >
            {{ item }}
            </v-list-item>
          </v-list>
        </template>
      </v-menu>
    </v-app-bar>

    <v-main v-if="!$store.state.startPageFinished">
      <start-page/>
    </v-main>

    <v-main v-if="$store.state.startPageFinished">
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>
import StartPage from './components/StartPage.vue';
import animalDataService from './services/animalDataService.js';
import clueDataService from './services/clueDataService.js';

export default {
  name: 'App',
  components: {
    StartPage
  },
  data() {
    return {
      menuItems: [
        'Home',
        'Search For Clues',
        'Suspects',
        'Solve the Case'
      ]
    }
  },
  methods: {
    routeToPage(item) {
      if ((item === 'Solve the Case') && (this.$route.name != 'Solve')) {
        this.$router.push({ name: 'Solve'});
      } else if ((item === 'Search For Clues') && (this.$route.name != 'SearchForClues')) {
        this.$router.push({ name: 'SearchForClues'});
      } else if ((this.$route.name != item) && (item != 'Solve the Case') && (item != 'Search For Clues')) {
        this.$router.push({ name: item });
      }
    },
    getScrambledLatinName(thief) {
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
    },
    getAnimalTypeClue(clueData, thief) {
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
    },
    getActiveTimeClue(clueData, thief) {
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
    },
    getLengthClue(clueData, thief) {
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
    },
    getWeightClue(clueData, thief) {
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
    },
    getLifespanClue(clueData, thief) {
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
    },
    getHabitatClue(clueData, thief) {
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
    }
  },
  computed: {
        appBarImageWidth () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return "30px"
                case 'sm': return "30px"
                case 'md': return "50px"
                case 'lg': return "50px"
                case 'xl': return "50px"
                default: return "50px"
            }
        }
  },
  created() {
    animalDataService.getAnimalData()
      .then(response => {
        const allAnimals = response.data.animals;
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

        this.$store.commit('SET_ALL_SUSPECTS', suspects);
        this.$store.commit('SET_ALL_CURRENT_SUSPECTS', currentSuspects);
        this.$store.commit('SET_THIEF', thief);
      })
      .catch(error => {
          console.log(error);
      })

    clueDataService.getClueData()
      .then(response => {
        const clueData = response.data.clues;
        const allClues = [];
        const thief = this.$store.state.thief;

        const scrambledLatinName = {
          type: 'latinName',
          clue: ''
        }
        scrambledLatinName.clue = this.getScrambledLatinName(thief);
        allClues.push(scrambledLatinName);

        allClues.push(this.getAnimalTypeClue(clueData, thief));
        allClues.push(this.getActiveTimeClue(clueData, thief));
        allClues.push(this.getLengthClue(clueData, thief));
        allClues.push(this.getWeightClue(clueData, thief));
        allClues.push(this.getLifespanClue(clueData, thief));
        allClues.push(this.getHabitatClue(clueData, thief));

        while (this.$store.state.clues.length < 5) {
          const randomIndexFromAllClues = Math.floor(Math.random() * allClues.length);

          const randomClue = allClues[randomIndexFromAllClues];
          allClues.splice(randomIndexFromAllClues, 1);

          this.$store.commit('ADD_CLUE', randomClue);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
};
</script>

<style scoped>
#app.set-app-background-to-black {
  background-color: #20292f;
}
</style>