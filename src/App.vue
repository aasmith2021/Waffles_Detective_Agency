<template>
  <v-app
    id="app"
    class='set-app-background-to-black'  
  >
    <v-app-bar
      app
      color="primary"
      dark
      v-show="$store.state.startPageFinished"
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
          class="text-h4 text-lg-h3 white--text"
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
              @click="$route.name != item ? $router.push({ name: item }) : ''"
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

export default {
  name: 'App',
  components: {
    StartPage
  },
  data() {
    return {
      menuItems: [
        'Home',
        'Map',
        'Suspects',
      ]
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
        this.$store.commit('SET_ALL_ANIMALS', allAnimals);
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