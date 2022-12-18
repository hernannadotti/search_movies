<template>
  <div class="container mt-5">
    <div class="row" v-if="!loading">
      <div class="col-2 offset-2">
        <picture class="me-4">
          <img class="img-responsive" :src="movie?.Poster" alt="">
        </picture>
      </div>
      <div class="col-8">
        <div class="row h-100">
          <div class="col-6 h-100">
            <div class="info-box d-flex h-100 align-items-end">
              <div class="main-info d-flex flex-column align-items-start">
                <span><b>{{movie?.Title}}</b></span>
                <span>{{movie?.Year}}</span>
              </div>
              <div>
                <span>{{movie?.Type}}</span>
              </div>
              <div>
                <span>{{movie?.Runtime}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-8 offset-2">
          <p class="text-start">{{movie?.Plot}}</p>
        </div>
      </div>
    </div>
    <div class="row" v-if="loading">
      <div class="col-10 offset-2 text-center">
        <span>Loading...</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IMovie } from '@/models/movie'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import api from './../services/api'

export default defineComponent({
  name: 'ItemMovieComponent',
  props: {
    msg: String
  },
  setup () {
    const route = useRoute()
    const movie = ref()
    const loading = ref(false)

    onMounted(() => {
      const movieId = route.params.id
      loading.value = true
      api.searchMovieById(movieId).then((response: IMovie) => {
        movie.value = response
        loading.value = false
      })
    })

    return { movie, loading }
  }
})

</script>

<style scoped lang="scss">
  picture {
    display: flex;
    align-self: flex-start;
    .img-responsive {
      width: 9rem;
      height: auto;
    }
  }

  .info-box {
    display: flex;

    div {
      flex-grow: 1;
    }
  }

</style>
