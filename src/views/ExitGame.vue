<template>
    <div class="d-flex flex-column">
        <v-card
            class="d-flex flex-column align-center primary"
        >
            <v-img
                src="../assets/waffles_3.jpg"
                width="125px"
                class="rounded-0 mr-4 mt-4"
            >
            </v-img>
        
            <v-card-title
                class="my-2 mt-4 white--text text-h4 text-md-h2 text-center mb-10"
            >
                Goodbye!
            </v-card-title>

            <v-card-text
                class="white--text text--darken-3 text-body-1 font-weight-bold text-center"
            >
                <em>You'll be redirected to the Cincinnati Zoo website in 10 seconds...</em>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'exit-game',
    created() {
        setTimeout(() => {
            window.location.href = "http://cincinnatizoo.org/";
        }, 10000);
    }
}
</script>

<style>

</style>