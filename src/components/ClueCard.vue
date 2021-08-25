<template>
    <v-card
        class="mt-6 mx-6"
        v-bind:width="clueCardWidth"
    >
    <v-card-title class="text-h5 font-weight-bold">
        Clue # {{ clue.id }}
    </v-card-title>
    <v-card-text class="pb-0 text-body-1" style="height: 50px;">
    </v-card-text>
    <v-card-actions>
    <v-btn
        text
        color="secondary accent-4"
        @click="reveal = true"
    >
        Show Clue
    </v-btn>
    </v-card-actions>

    <v-expand-transition>
    <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 75%;"
        elevation="0"
    >
        <v-card-title class="text-h5 font-weight-bold">

        </v-card-title>
        <v-card-text class="pb-0 text-body-1">
            {{ clue.clueText }}
        </v-card-text>
        <v-spacer class="my-7"></v-spacer>
        <v-card-actions class="pt-0">
        <v-btn
            text
            color="secondary accent-4"
            @click="reveal = false"
        >
            Close
        </v-btn>
        </v-card-actions>
    </v-card>
    </v-expand-transition>
</v-card>
</template>

<script>
export default {
    name: 'clue-card',
    props: ['clue'],
    data() {
        return {
            reveal: false
        }
    },
    computed: {
        clueCardWidth () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return "90vw"
                case 'sm': return "90vw"
                case 'md': return "43.5vw"
                case 'lg': return "29vw"
                case 'xl': return "29vw"
                default: return "29vw"
            }
        },
    }
}
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>