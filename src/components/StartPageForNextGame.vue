<template>
    <div>
        <v-card
            class="d-flex flex-column align-center primary mx-8"
        >

            <div class="d-flex flex-column flex-md-row align-center">
                <v-img
                    src="../assets/waffles_3.jpg"
                    width="125px"
                    class="rounded-0 mr-4 mt-4"
                >
                </v-img>

                <!-- CARD TITLE -->            
                <v-card-title
                    v-show="currentPageNumber === 1"
                    class="my-2 mt-4 white--text text-h4 text-md-h2 text-center"
                >
                There's Been Another Robbery!
                </v-card-title>
            </div>

            <!-- CARD TEXT -->
            <v-card-text
                class="white--text text-subtitle-1 text-sm-h5 text-center font-weight-regular px-16"
                v-show="currentPageNumber === 1"
            >
                Thank goodness you're still here, <b>{{ $store.state.userName }}</b>! Another bandit has been at it again!
                <br />
                <br />
                This time, an animal has broken into the Cincinnai Zoo and stolen ALL of the <b>{{ $store.state.stolenObject }}</b>!
            </v-card-text>

            <v-card-text
                class="white--text text-subtitle-1 text-sm-h5 text-center font-weight-regular px-16"
                v-show="currentPageNumber === 2"
            >
                Are you ready to solve the mystery with me?
            </v-card-text>

            <v-card-text
                class="white--text text-subtitle-1 text-sm-h5 text-center font-weight-regular px-16"
                v-show="currentPageNumber === 3"
            >
                All right, then! Let's get started!
            </v-card-text>

            <!-- BUTTONS -->
            <v-btn
                v-show="currentPageNumber === 1"
                class="my-5"
                @click="setCurrentPageNumber(currentPageNumber + 1)"
            >
                Next
            </v-btn>

            <v-btn
                v-show="currentPageNumber === 2"
                class="my-5"
                @click="setCurrentPageNumber(currentPageNumber + 1)"
            >
                Yes, I am!
            </v-btn>

            <v-btn
                v-show="currentPageNumber === 3"
                class="my-5"
                :height="letsGoButtonHeight"
                @click="setStartPageToFinished"
            >
                Let's go!
            </v-btn>
        </v-card>
    </div>
</template>

<script>
import gameSetup from '../views/modules/gameSetup.js';

export default {
    name: 'start-page-for-next-game',
    data() {
        return {
            currentPageNumber: 0,
            userName: '',
            noNameInputDialog: false
        }
    },
    methods: {
        setStartPageToFinished() {
            this.$store.commit('SET_START_PAGE_TO_FINISHED');
            
            if (this.$route.name != 'Suspects') {
                this.$router.push({ name: 'Suspects'});
            }
        },
        setCurrentPageNumber(newPageNumber) {
            this.currentPageNumber = newPageNumber;
        },
        checkMinLength() {
            if (this.userName.length === 0) {
                this.noNameInputDialog = true;
            }
        },
        async setupGameData() {
            const suspectAndClueData = await gameSetup.getSuspectsAndClues();
            this.$store.commit('SET_ALL_SUSPECTS', suspectAndClueData.suspects);
            this.$store.commit('SET_ALL_CURRENT_SUSPECTS', suspectAndClueData.currentSuspects);
            this.$store.commit('SET_THIEF', suspectAndClueData.thief);
            for (let i = 0; i < 5; i++) {
                this.$store.commit('ADD_CLUE', suspectAndClueData.clues[i]);
            }
        }
    },
    computed: {
        dialogWidth () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return "80vw"
                case 'sm': return "70vw"
                case 'md': return "60vw"
                case 'lg': return "50vw"
                case 'xl': return "50vw"
                default: return "50vw"
            }
        },
        letsGoButtonHeight () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return "50px"
                case 'sm': return ""
                case 'md': return ""
                case 'lg': return ""
                case 'xl': return ""
                default: return ""
            }
        },
        addButtonBreak () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return true
                case 'sm': return false
                case 'md': return false
                case 'lg': return false
                case 'xl': return false
                default: return false
            }
        }
    },
    created() {
        this.$store.commit('RESET_STORE_FOR_ANOTHER_GAME');
        this.currentPageNumber = 1;
        const randomStolenObjectIndex = Math.floor(Math.random() * this.$store.state.stolenObjects.length);
        this.$store.commit('SET_STOLEN_OBJECT', this.$store.state.stolenObjects[randomStolenObjectIndex]);
        this.setupGameData();
    },
}
</script>

<style scoped>
#name-form {
    justify-self: center;
    width: 60vw;
    max-width: 350px;
}

.centered-input >>> input {
    text-align: center;
}
</style>