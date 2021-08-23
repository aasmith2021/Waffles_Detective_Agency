<template>
    <div>
        <h1 class="text-h2 white--text text-center mt-3">Solve the Case</h1>

        <div>
            <v-card class="d-flex flex-column align-center mt-6 mx-6">

                <v-card-title
                    class="d-block text-center"
                >
                    We've gathered the clues, <br v-show="addLineBreaks" />and it's time to make an <br v-show="addLineBreaks" />accusation!
                    <br />
                    <br />
                    But, choose carefully - <br v-show="addLineBreaks" />you only have <span class="primary--text">{{ $store.state.accusationsRemaining }}</span> guess<span v-show="$store.state.accusationsRemaining > 1 || $store.state.accusationsRemaining === 0">es</span><br v-show="addLineBreaks" /> left!
                </v-card-title>

                <v-select
                    class="fit"
                    :items="suspectNames"
                    v-model="accusedAnimal"
                    dense
                    solo
                >
                </v-select>
                <v-btn
                    class="my-4"
                    color="primary"
                    @click="submitAccusation"
                >
                    Accuse the suspect!
                </v-btn>

                <v-dialog
                    persistent
                    v-model="noSuspectSelectedDialog"
                    :width="dialogWidth"
                >
                    <v-card class="d-flex flex-column align-center text-center">
                        <v-card-title>
                            No Suspect Selected
                        </v-card-title>

                        <v-card-text
                            class="text-body-1"
                        >
                            Please select a suspect from the list to submit an accustion.
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                color="primary"
                                elevation="2"
                                class="mb-4"
                                @click="noSuspectSelectedDialog = false"
                            >
                                Ok
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                
                <v-dialog
                    persistent
                    v-model="incorrectAccusationSubmitted"
                    :width="dialogWidth"
                >
                    <v-card class="d-flex flex-column align-center text-center">
                        <v-card-title>
                            You Accused An <br v-show="addLineBreaks" />Innocent Animal!
                        </v-card-title>

                        <v-card-text
                            class="text-body-1"
                        >
                            We brought the {{ accusedAnimal }} down to the police station for questioning,
                            but they have an air-tight alibi. So, they couldn't have commited the crime.
                            <br />
                            <br />
                            Keep looking! The thief is still out there somewhere...
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                color="primary"
                                elevation="2"
                                class="mb-4"
                                @click="incorrectAccusationSubmitted = false"
                            >
                                I'll keep looking!
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog
                    persistent
                    v-model="correctAccusationSubmitted"
                    :width="dialogWidth"
                >
                    <v-card class="d-flex flex-column align-center text-center">
                        <v-card-title>
                            You Found The <br v-show="addLineBreaks" />Thief!
                        </v-card-title>

                        <v-card-text 
                            class="text-body-1"
                        >
                            We brought the {{ accusedAnimal }} down to the police station for questioning,
                            and after hearing about the evidence you found, the {{ accusedAnimal }} confessed!
                            <br />
                            <br />
                            <em>"I was really hungry, and thought no one would notice that all of {{ $store.state.stolenObject }} was missing."</em> the {{ accusedAnimal }} said.
                            <em>"But, I didn't know the agents from Waffles' Detective Agency would be involved!"</em>
                            <br />
                            <br />
                            The {{ accusedAnimal }} apologized, returned all of the {{ $store.state.stolenObject }} that was left, and paid for the food that was eaten.
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                color="primary"
                                elevation="2"
                                class="mb-4"
                                @click="closeGame"
                            >
                                Ok
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog
                    persistent
                    v-model="noMoreAttemptsRemaining"
                    :width="dialogWidth"
                >
                    <v-card class="d-flex flex-column align-center text-center">
                        <v-card-title>
                            You've Run <br v-show="addLineBreaks" />Out Of Time!
                        </v-card-title>

                        <v-card-text
                            class="text-body-1"
                        >
                            Unfortunately, after two accusations of innocent suspects, the real thief has likely become nervous and skipped town.
                            <br />
                            <br />
                            We'll find them eventually, but we have to mark this as a "cold case" and move on to more pressing mysteries.
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                color="primary"
                                elevation="2"
                                class="mb-4"
                                @click="closeGame"
                            >
                                Ok
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog
                    persistent
                    fullscreen
                    v-model="closeGameDialog"
                    :width="dialogWidth"
                >
                    <v-card class="d-flex flex-column align-center text-center">
                        <v-img
                            max-width="125px"
                            max-height="125px"
                            src="../assets/waffles_3.jpg"
                            class="rounded-0 mr-4 mt-4 pa-0"
                        >
                        </v-img>

                        <v-card-title>
                            Thank You For Playing!
                        </v-card-title>

                        <v-card-text
                            class="text-body-1"
                        >
                            Would you like to solve another mystery with Waffles' Detective Agency?
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                color="primary"
                                outlined
                                @click="refreshGame"
                            >
                                Yes
                            </v-btn>

                            <v-btn
                                color="primary"
                                outlined
                                @click="exit"
                            >
                                No
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'solve',
    data() {
        return {
            suspectNames: [],
            accusedAnimal: '',
            noSuspectSelectedDialog: false,
            incorrectAccusationSubmitted: false,
            correctAccusationSubmitted: false,
            noMoreAttemptsRemaining: false,
            closeGameDialog: false
        }
    },
    methods: {
        submitAccusation() {
            if (this.accusedAnimal === '') {
                this.noSuspectSelectedDialog = true;
            } else if (this.accusedAnimal === this.$store.state.thief.name) {
                this.correctAccusationSubmitted = true;
            } else {
                this.incorrectAccusationSubmitted = true;
                this.$store.commit('DECREMENT_ACCUSATIONS_REMAINING');
            }

            if (this.$store.state.accusationsRemaining === 0) {
                this.noMoreAttemptsRemaining = true;
            }
        },
        closeGame() {
            this.correctAccusationSubmitted = false;
            this.noMoreAttemptsRemaining = false;
            this.closeGameDialog = true;
        },
        refreshGame() {
            this.$router.push({ name: 'Loading'});
            this.$router.go();
        },
        exit() {
            this.$store.commit('SET_EXIT_GAME_TO_TRUE');
            this.$router.push({ name: 'ExitGame'});
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
        addLineBreaks () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return true
                case 'sm': return true
                case 'md': return false
                case 'lg': return false
                case 'xl': return false
                default: return false
            }
        }
    },
    created() {
        this.$store.state.suspects.forEach(element => {
            this.suspectNames.push(element.name);
        });

        this.suspectNames.sort();
    }
}
</script>

<style scoped>
.v-select.fit {
    width: 310px;
}

</style>