<template>
    <div>
        <v-card
            class="d-flex flex-column align-center primary mx-8"
            @keyup.enter="clickNameEntryButton"
        >
                <v-dialog
                    persistent
                    v-model="noNameInputDialog"
                    :width="dialogWidth"
                >
                    <v-card class="d-flex flex-column align-center text-center">
                        <v-card-title>
                            Please Enter a Name
                        </v-card-title>

                        <v-card-text>
                            You must enter a name between 1-25 characters. Please try again.
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                color="primary"
                                @click="noNameInputDialog = false"
                            >
                                Ok
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

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
                There's Been A Robbery!
                </v-card-title>
            </div>

            <!-- CARD TEXT -->
            <v-card-text
                class="white--text text-subtitle-1 text-sm-h5 text-center font-weight-regular px-16"
                v-show="currentPageNumber === 1"
            >
                Thank goodness you're here! There's no time to waste...we've got to get moving before the trail gets
                cold!
                <br />
                <br />
                An unidentified animal has broken into the Cincinnai Zoo and stolen ALL of the <b>{{ $store.state.stolenObject }}</b>!
            </v-card-text>

            <v-card-text
                class="d-flex flex-column align-center white--text text-subtitle-1 text-sm-h5 text-center font-weight-regular px-16"
                v-show="currentPageNumber === 2"
            >
                <div v-show="currentPageNumber === 2">
                    Well, grab your things ..... um, what is your name again?
                    <br />
                    <br />
                </div>
                <v-form id="name-form" v-show="currentPageNumber === 2">
                    <v-text-field
                        class="centered-input white px-4 text-h6"
                        v-model="userName"
                        maxlength="25"
                        required
                    >
                    </v-text-field>
                </v-form>
            </v-card-text>

            <v-card-text
                class="white--text text-subtitle-1 text-sm-h5 text-center font-weight-regular px-16"
                v-show="currentPageNumber === 3"
            >
                It's nice to meet you, <b>{{ userName }}</b>!
                <br />
                <br />
                My name is Detective Waffles, and I'm the top mystery-solving dog in the world!
                <br />
                <br />
                But, I'll need your assistance to find clues, interview suspects, and figure out who the thief is.
            </v-card-text>

            <v-card-text
                class="white--text text-subtitle-1 text-sm-h5 text-center font-weight-regular px-16"
                v-show="currentPageNumber === 4"
            >
                Are you ready to solve the mystery with me?
            </v-card-text>

            <v-card-text
                class="white--text text-subtitle-1 text-sm-h5 text-center font-weight-regular px-16"
                v-show="currentPageNumber === 5"
            >
                All right, then! Let's get started!
            </v-card-text>

            <!-- BUTTONS -->
            <v-btn
                v-show="currentPageNumber === 1 || currentPageNumber === 3"
                class="my-5"
                @click="setCurrentPageNumber(currentPageNumber + 1)"
            >
                Next
            </v-btn>

            <v-btn
                id="name-entry-button"
                v-show="currentPageNumber === 2"
                class="my-5"
                @click="updateUserNameInStore()"
                @keyup.enter="updateUserNameInStore()"
            >
                Next
            </v-btn>

            <v-btn
                v-show="currentPageNumber === 4"
                class="my-5"
                @click="setCurrentPageNumber(currentPageNumber + 1)"
            >
                Yes, I am!
            </v-btn>

            <v-btn
                v-show="currentPageNumber === 5"
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
    name: 'start-page',
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
            this.$store.commit('SET_GAME_FROM_SCRATCH_TO_FALSE');
            
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
        updateUserNameInStore() {
            this.checkMinLength();

            if (this.noNameInputDialog === false) {
                this.$store.commit('UPDATE_USER_NAME', this.userName);
                this.setCurrentPageNumber(this.currentPageNumber + 1);
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
        },
        clickNameEntryButton() {
            const nameEntryButton = document.querySelector('#name-entry-button');
            nameEntryButton.click();
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