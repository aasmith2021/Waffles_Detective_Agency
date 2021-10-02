<template>
    <div>
        <h1 class="text-h2 white--text text-center mt-3">Suspects</h1>
        <div
            class="d-flex flex-wrap justify-space-around"
        >
            <v-card
                class="mt-6 mx-6"
                v-bind:width="suspectCardWidth"
                v-for="animal in $store.state.suspects"
                v-bind:key="animal.name"
            >
                <v-card-title
                    class="justify-center"
                >
                    {{ animal.name }}
                </v-card-title>
                <div class="d-flex flex-column align-center flex-lg-row align-lg-start">
                    <v-img
                        v-bind:src="animal.image"
                        v-bind:width="suspectImageWidth"
                        class="rounded-0 mx-2 mb-2"
                        contain
                    >
                    </v-img>
                    <v-card-text
                        class="px-2 pt-0 pb-2 text-center text-lg-left"
                    >
                        <b>Type:</b> {{ animal.animalType }}
                        <br/>
                        <b>Height:</b> {{ animal.lengthMin }} - {{ animal.lengthMax }} ft.
                        <br/>
                        <b>Weight:</b> {{ animal.weightMin }} - {{ animal.weightMax }} lb.
                        <br/>
                        <b>Active During:</b> {{ animal.activeTime === "Diurnal" ? "Day" : "Night" }}
                        <br />
                        <b>Latin Name:</b> {{ animal.latinName }}
                        <br/>
                        <b>Diet:</b> {{ animal.diet }}
                        <br/>
                        <b>Habitat:</b> {{ animal.habitat }}
                        <br/>
                        <b>Range:</b> {{ animal.range }}
                    </v-card-text>
                </div>
            </v-card>
        </div>

        <v-spacer class="mb-6"></v-spacer>
    </div>
</template>

<script>
export default {
    name: 'suspects',
    computed: {
        suspectCardWidth () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return "90vw"
                case 'sm': return "90vw"
                case 'md': return "43.5vw"
                case 'lg': return "29vw"
                case 'xl': return "29vw"
                default: return "29vw"
            }
        },
        suspectImageWidth () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return "50vw"
                case 'sm': return "50vw"
                case 'md': return "35vw"
                case 'lg': return "13vw"
                case 'xl': return "13vw"
                default: return "13vw"
            }
        }
    }
}
</script>

<style scoped>
</style>