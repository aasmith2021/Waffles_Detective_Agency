<template>
  <v-card
    class="d-flex flex-column align-center"
    height="100%"
  >
      <v-card-title
        class="text-h4 text-center mt-10"
      >
          LOADING <br v-show="addLineBreaks" />NEW <br v-show="addLineBreaks" />CASE
      </v-card-title>
      <v-progress-circular
        indeterminate
        color="primary"
        :size="100"
        class="my-10"
      >
      </v-progress-circular>
  </v-card>
</template>

<script>
export default {
  name: 'loading',
  computed: {
    addLineBreaks () {
      switch (this.$vuetify.breakpoint.name) {
          case 'xs': return true
          case 'sm': return false
          case 'md': return false
          case 'lg': return false
          case 'xl': return false
          default: return false
      }
    }
  }
}
</script>

<style>

</style>