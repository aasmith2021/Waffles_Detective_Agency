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
        class="d-flex flex-row mx-1"
        color="primary"
      >
        <v-img
          src="./assets/waffles_3.jpg"
          width="50px"
          class="rounded-0 mr-4"
        >
        </v-img>
        <h1>Waffles' Detective Agency</h1>
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
  }
};
</script>

<style scoped>
#app.set-app-background-to-black {
  background-color: #20292f;
}
</style>