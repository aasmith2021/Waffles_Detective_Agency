<template>
    <div>
        <h1 class="text-h2 white--text text-center mt-3">Solve the Case</h1>

        <div>
            <v-card class="d-flex flex-column align-center mt-6 mx-6">

                <v-card-title
                    class="d-block text-center"
                >
                    We've gathered the clues, and it's time to make an accusation!
                    <br />
                    But, choose carefully; you only have <span class="primary--text">{{ $store.state.accusationsRemaining }}</span> guesses left!
                </v-card-title>
                <v-form>
                    <v-select
                        :items="suspectNames"
                        v-model="accusedAnimal"
                    >
                    </v-select>
                    <v-btn
                        class="my-4"
                        color="primary"
                        @click="submitAccusation"
                    >
                        Accuse the suspect of murder!
                    </v-btn>
                </v-form>
                
                <v-dialog
                    v-model="incorrectAccusationSubmitted"
                    :width="dialogWidth"
                >
                    <v-card class="d-flex flex-column align-center text-center">
                        <v-card-title>
                            You Accused An Innocent Animal!
                        </v-card-title>

                        <v-card-text>
                            We brought the {{ accusedAnimal.name }} down to the police station for questioning,
                            but they have an air-tight alibi. So, they couldn't have commited the murder.
                            <br />
                            But, keep looking! The killer is still out there somewhere...
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                color="primary"
                                text
                                @click="incorrectAccusationSubmitted = false"
                            >
                                I'll keep looking!
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog
                    v-model="correctAccusationSubmitted"
                    :width="dialogWidth"
                >
                    <v-card class="d-flex flex-column align-center text-center">
                        <v-card-title>
                            You Found The Murderer!
                        </v-card-title>

                        <v-card-text>
                            We brought the {{ accusedAnimal.name }} down to the police station for questioning,
                            and after hearing about the evidence you found, the {{ accusedAnimal.name }} confessed!
                            <br />
                            <em>"I wanted to get revenge, and I thought I'd get away with it,"</em> the {{ accusedAnimal.name }} said.
                            <em>"But, I didn't know the agents from Waffles' Detective Agency would be involved!"</em>
                            <br />
                            With that, the {{ accusedAnimal.name }} was taken away to face justice.
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                color="primary"
                                text
                                @click="correctAccusationSubmitted = false"
                            >
                                Ok
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog
                    v-model="noMoreAttemptsRemaining"
                    :width="dialogWidth"
                >
                    <v-card class="d-flex flex-column align-center text-center">
                        <v-card-title>
                            You've Run Out Of Time!
                        </v-card-title>

                        <v-card-text>
                            Unfortunately, after two incorrect accusations of innocent suspects, the real murderer has likely become nervous and skipped town.
                            <br />
                            We'll find them eventually, but we have to mark this as a "cold case" and move on to more pressing mysteries.
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                color="primary"
                                text
                                @click="closeGame"
                            >
                                Ok
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog
                    v-model="closeGameDialog"
                    :width="dialogWidth"
                >
                    <v-card class="d-flex flex-column align-center text-center">
                        <v-card-title>
                            Thank You For Playing!
                        </v-card-title>

                        <v-card-text>
                            Would you like to solve another mystery with Waffles' Detective Agency?
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                color="primary"
                                text
                                @click="exit"
                            >
                                Yes
                            </v-btn>

                            <v-btn
                                color="primary"
                                text
                                @click="refreshGame"
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
            accusedAnimal: {},
            incorrectAccusationSubmitted: false,
            correctAccusationSubmitted: false,
            noMoreAttemptsRemaining: false,
            closeGameDialog: false
        }
    },
    methods: {
        submitAccusation() {
            if (this.accusedAnimal.name === this.$store.state.murderer.name) {
                this.correctAccusationSubmitted = true;
            } else {
                this.incorrectAccusationSubmitted = true;
            }

            this.$store.commit('DECREMENT_ACCUSATIONS_REMAINING');

            if (this.$store.state.accusationsRemaining === 0) {
                this.noMoreAttemptsRemaining = true;
            }
        },
        closeGame() {
            this.noMoreAttemptsRemaining = false;
            this.closeGameDialog = true;
        },
        refreshGame() {
            
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
    },
    created() {
        for (let i = 0; i < this.$store.state.suspects.length; i++) {
            this.suspectNames.push(this.$store.state.suspects[i].name);
        }
    }
}
</script>

<style>

</style>