<template>
  <div
    class="d-flex flex-column-reverse align-stretch flex-md-row justify-md-center align-md-start"
  >

    <v-card class="d-flex flex-column align-start mt-6 mx-6">
      <v-card-title class="text-h4 ml-2">
        Not The <br v-show="addCardTitleBreak" />Murderer
      </v-card-title>
      <v-btn
        class="ml-6 mb-3"
        color="primary"
        width="200px"
        height="30px"
        :disabled="notTheMurdererCheckedArray.length === 0"
        @click="moveNTMToCS"
      >
        Current Suspect
      </v-btn>
      <v-btn
        class="ml-6 mb-2"
        color="primary"
        width="200px"
        height="30px"
        :disabled="notTheMurdererCheckedArray.length === 0"
        @click="moveNTMToLS"
      >
        Leading Suspect
      </v-btn>

      <v-card
        v-for="suspect in $store.state.notTheMurderer"
        v-bind:key="suspect.name"
        class="d-flex align-center elevation-0 ml-6 pa-0"
        color="transparent"
        height="45px"
      >
        <v-checkbox
            height="10px"
            v-model="notTheMurdererCheckedArray"
            :value="suspect"
        >
        </v-checkbox>
        <v-card-title
            class="ml-2 mr-6 pa-0 text-h6"
            :class="{ 'primary--text': notTheMurdererCheckedArray.includes(suspect) }"
        >
            {{ suspect.name }}
        </v-card-title>
      </v-card>

      <v-spacer class="my-1"></v-spacer>
    </v-card>
    
    <v-card class="d-flex flex-column align-start mt-6 mx-6">
      <v-card-title class="text-h4 ml-2">
        Current <br v-show="addCardTitleBreak" />Suspects
      </v-card-title>
      <v-btn
        class="ml-6 mb-3"
        color="primary"
        width="200px"
        height="30px"
        :disabled="currentSuspectCheckedArray.length === 0"
        @click="moveCSToLS"
      >
        Leading Suspect
      </v-btn>
      <v-btn
        class="ml-6 mb-2"
        color="primary"
        width="200px"
        height="30px"
        :disabled="currentSuspectCheckedArray.length === 0"
        @click="moveCSToNTM"
      >
        Not The Murderer
      </v-btn>

      <v-card
        v-for="suspect in $store.state.currentSuspects"
        v-bind:key="suspect.name"
        class="d-flex align-center elevation-0 ml-6 pa-0"
        color="transparent"
        height="45px"
      >
        <v-checkbox
            height="10px"
            v-model="currentSuspectCheckedArray"
            :value="suspect"
        >
        </v-checkbox>
        <v-card-title
            class="ml-2 mr-6 pa-0"
            :class="{ 'primary--text': currentSuspectCheckedArray.includes(suspect) }"
        >
            {{ suspect.name }}
        </v-card-title>
      </v-card>

      <v-spacer class="my-1"></v-spacer>
    </v-card>

    <v-card class="d-flex flex-column align-start mt-6 mx-6">
      <v-card-title class="text-h4 ml-2">
        Leading <br v-show="addCardTitleBreak" />Suspects
      </v-card-title>
      <v-btn
        class="ml-6 mb-3"
        color="primary"
        width="200px"
        height="30px"
        :disabled="leadingSuspectCheckedArray.length === 0"
        @click="moveLSToCS"
      >
        Current Suspect
      </v-btn>
      <v-btn
        class="ml-6 mb-2"
        color="primary"
        width="200px"
        height="30px"
        :disabled="leadingSuspectCheckedArray.length === 0"
        @click="moveLSToNTM"
      >
        Not The Murderer
      </v-btn>

      <v-card
        v-for="suspect in $store.state.leadingSuspects"
        v-bind:key="suspect.name"
        class="d-flex align-center elevation-0 ml-6 pa-0"
        color="transparent"
        height="45px"
      >
        <v-checkbox
            height="10px"
            v-model="leadingSuspectCheckedArray"
            :value="suspect"
        >
        </v-checkbox>
        <v-card-title
            class="ml-2 mr-6 pa-0"
            :class="{ 'primary--text': leadingSuspectCheckedArray.includes(suspect) }"
        >
            {{ suspect.name }}
        </v-card-title>
      </v-card>

      <v-spacer class="my-1"></v-spacer>
    </v-card>

  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        currentSuspectCheckedArray: [],        
        leadingSuspectCheckedArray: [],
        notTheMurdererCheckedArray: [],
      }
    },
    methods: {
      moveCSToLS() {
        this.currentSuspectCheckedArray.forEach(suspect => {
          this.$store.commit('MOVE_FROM_CS_TO_LS', suspect);
        })

        this.currentSuspectCheckedArray = [];
      },
      moveCSToNTM() {
        this.currentSuspectCheckedArray.forEach(suspect => {
          this.$store.commit('MOVE_FROM_CS_TO_NTM', suspect);
        })

        this.currentSuspectCheckedArray = [];
      },
      moveLSToCS() {
        this.leadingSuspectCheckedArray.forEach(suspect => {
          this.$store.commit('MOVE_FROM_LS_TO_CS', suspect);
        })

        this.leadingSuspectCheckedArray = [];
      },
      moveLSToNTM() {
        this.leadingSuspectCheckedArray.forEach(suspect => {
          this.$store.commit('MOVE_FROM_LS_TO_NTM', suspect);
        })

        this.leadingSuspectCheckedArray = [];
      },
      moveNTMToCS() {
        this.notTheMurdererCheckedArray.forEach(suspect => {
          this.$store.commit('MOVE_FROM_NTM_TO_CS', suspect);
        })

        this.notTheMurdererCheckedArray = [];
      },
      moveNTMToLS() {
        this.notTheMurdererCheckedArray.forEach(suspect => {
          this.$store.commit('MOVE_FROM_NTM_TO_LS', suspect);
        })

        this.notTheMurdererCheckedArray = [];
      }
    },
    computed: {
        addCardTitleBreak () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return true
                case 'sm': return false
                case 'md': return true
                case 'lg': return false
                case 'xl': return false
                default: return false
            }
        }
    }
  }
</script>
