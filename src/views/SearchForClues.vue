<template>
    <div>
        <h1 class="text-h2 white--text text-center mt-3">Search For Clues</h1>

        <div class="d-flex flex-wrap space-between justify-center">
            <clue-card
                v-for="clue in $store.state.clues"
                v-bind:key="clue.id"
                v-bind:clue="clue"
            />
        </div>
    </div>
</template>

<script>
import ClueCard from '../components/ClueCard.vue'

export default {
    name: "search-for-clues",
    components: {
        ClueCard
    }
}
</script>

<style>

</style>