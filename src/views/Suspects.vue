<template>
    <div>
        <h1 class="text-h2 white--text text-center mt-3">Suspects</h1>
        <div class="d-flex flex-wrap justify-center">
            <v-card
                class="mt-6 mx-6"
                width="29vw"
                height="330px"
                v-for="animal in $store.state.animals"
                v-bind:key="animal.name"
            >
                <v-card-title>
                    {{ animal.name }}
                </v-card-title>
                <div id="card-text-outer-div" class="d-flex flex-row align-start">
                    <v-img
                        v-bind:src="animal.image"
                        class="suspect-picture rounded-0 mx-2 mb-2"
                    >
                    </v-img>
                    <v-card-text id="suspect-text">
                        <b>Type:</b> {{ animal.type }}
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
    </div>
</template>

<script>
export default {
    name: 'suspects'
}
</script>

<style scoped>
#suspect-text {
    padding: 0;
    margin: 0 4px 4px 4px;
}

#card-text-outer-div {
    height: 30vh;
}

div#card-text-outer-div > .suspect-picture {
    width: 12vw;
    max-height: 90%;
    object-fit: cover;
}
</style>