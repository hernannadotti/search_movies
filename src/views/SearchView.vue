<template>
  <div class="about">
    <SearchComponent />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import SearchComponent from '@/components/SearchComponent.vue'

@Options({
  components: {
    SearchComponent
  }
})
export default class SearchView extends Vue {}
</script>
