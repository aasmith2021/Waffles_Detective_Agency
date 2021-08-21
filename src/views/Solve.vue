<template>
    <div>
        <h1 class="text-h2 white--text text-center mt-3">Solve the Case</h1>

        <div>
            <v-card class="mt-6 mx-6">
                <v-card-title>
                    This page is where the Solve the Case will be!
                </v-card-title>
                <v-form>
                    <v-select
                        :items="suspectNames"
                    >
                    </v-select>
                    <v-btn>
                        Accuse the suspect of murder!
                    </v-btn>
                </v-form>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'solve',
    data() {
        return {
            suspectNames: []
        }
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