<template>
    <div>
        <v-card
            class="d-flex flex-column align-center primary mx-8"
            primary
        >
            <div class="d-flex flex-row">
                <v-img
                    src="../assets/waffles_3.jpg"
                    width="8vw"
                    class="rounded-0 mr-4 mt-4"
                >
                </v-img>

                <!-- CARD TITLE -->            
                <v-card-title
                    v-show="currentPageNumber === 1"
                    class="my-2 mt-4 white--text text-h2"
                >
                There's Been A Murder!
                </v-card-title>
            </div>

            <!-- CARD TEXT -->
            <v-card-text
                class="white--text text-h5 text-center font-weight-regular px-16"
                v-show="currentPageNumber === 1"
            >
                Thank goodness you're here! There's no time to waste...we've got to get moving before the trail gets
                cold!
                <br />
                <br />
                There's a killer on the loose, and we've got to stop them before they kill again.
            </v-card-text>

            <v-card-text
                class="d-flex flex-column align-center white--text text-h5 text-center font-weight-regular px-16"
                v-show="currentPageNumber === 2"
            >
                Well, grab your things ..... um, what is your name again?
                <br />
                <br />
                <v-form id="name-form" class="mx-16 px-16">
                    <v-text-field
                        class="centered-input white px-4 text-h6"
                        v-model="userName"
                        v-bind:rules="[rules.maxLength]"
                        required
                    >
                    </v-text-field>
                </v-form>
            </v-card-text>

            <v-card-text
                class="white--text text-h5 text-center font-weight-regular px-16"
                v-show="currentPageNumber === 3"
            >
                It's nice to meet you, <b>{{ userName }}</b>!
                <br />
                <br />
                My name is Detective Waffles, and I'm the top mystery-solving K9 in the world!
                <br />
                <br />
                But, I'll need your assistance to find clues, interview suspects, and identify the murderer.
            </v-card-text>

            <v-card-text
                class="white--text text-h5 text-center font-weight-regular px-16"
                v-show="currentPageNumber === 4"
            >
                Are you ready to solve the mystery with me?
            </v-card-text>

            <v-card-text
                class="white--text text-h5 text-center font-weight-regular px-16"
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
                v-show="currentPageNumber === 2"
                class="my-5"
                @click="updateUserNameInStore()"
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
                @click="setStartPageToFinished"
            >
                Let's go! We have a murderer to find!
            </v-btn>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'start-page',
    data() {
        return {
            currentPageNumber: 0,
            userName: '',
            rules: {
                maxLength: value => value.length <= 30 || 'Max. 30 characters'
            }
        }
    },
    methods: {
        setStartPageToFinished() {
            this.$store.commit('SET_START_PAGE_TO_FINISHED');
        },
        setCurrentPageNumber(newPageNumber) {
            this.currentPageNumber = newPageNumber;
        },
        updateUserNameInStore() {
            this.$store.commit('UPDATE_USER_NAME', this.userName);
            this.setCurrentPageNumber(this.currentPageNumber + 1);
        }
    },
    created() {
        this.currentPageNumber = 1;
    }
}
</script>

<style scoped>
#name-form {
    justify-self: center;
    width: 30vw;
}

.centered-input >>> input {
    text-align: center;
}
</style>