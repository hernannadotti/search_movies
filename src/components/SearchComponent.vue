<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-5 offset-3 wrapper">
        <input class="main" v-model="text" placeholder="Find your favorite movie..." type="text">
        <button class="ms-2 btn btn-dark btn-lg" @click="search">Search</button>
      </div>
    </div>
    <template v-if="!loading">
      <template v-if="movies?.length">
        <div class="row">
          <div class="col-5 offset-3 my-4 text-start sub-header">
            <h2 class="search">Search Results</h2>
            <div class="actions">
              <button @click="prev" :disabled="currentPage === 1" class="me-2">Prev</button>
              <button @click="next" :disabled="!(currentPage < (rows / perPage))">Next</button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 offset-3">
            <b-table
              :items="movies"
              :fields="fields"
              id="movies"
              @row-clicked="goDetails"
              :current-page="currentPage">
            </b-table>
          </div>
        </div>
      </template>
      <template v-if="error?.length">
        <div class="row">
          <div class="col-5 offset-3 mt-5">
            <span>{{error}}</span>
          </div>
        </div>
      </template>
    </template>
    <template v-if="loading">
      <div class="row">
        <div class="col-5 offset-3 mt-5">
          <span>Loading...</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { IMovie } from '@/models/movie'
import { IMoviesResponse } from '@/models/moviesResponse'
import router from '@/router'
import { computed, defineComponent, ref, watch } from 'vue'
import api from './../services/api'

export default defineComponent({
  name: 'SearchComponent',
  props: {
    msg: String
  },
  setup () {
    const totalResults = ref<number>(0)
    const perPage = 10
    const currentPage = ref(1)
    const movies = ref()
    const text = ref <string>('')
    const fields: string[] = ['mainField']
    const formattedText = computed<string>(
      () => text.value.replace(/\s/g, '')
    )
    const rows = computed<number>(
      () => Math.ceil(totalResults.value)
    )
    const loading = ref(false)
    const error = ref('')

    async function search () {
      loading.value = true
      const response = await api.searchMovie(currentPage.value, formattedText)
      totalResults.value = await Number(response.totalResults)
      if (response.Response === 'True') {
        error.value = ''
        movies.value = await response.Search.map((movie: IMovie) => {
          movie = { ...movie, mainField: `${movie.Title} (${movie.Year})` }
          return movie
        })
      } else {
        movies.value = []
        error.value = response.Error
      }
      loading.value = false
    }

    function goDetails (item: IMovie) {
      router.push({ path: `/item/${item.imdbID}` })
    }

    function next () {
      if (currentPage.value < Math.ceil(rows.value / perPage)) {
        currentPage.value++
      }
    }

    function prev () {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    watch(currentPage, () => {
      api.searchMovie(currentPage.value, formattedText).then((response: IMoviesResponse) => {
        totalResults.value = Number(response.totalResults)
        movies.value = response.Search.map((movie:IMovie) => {
          movie = { ...movie, mainField: `${movie.Title} (${movie.Year})` }
          return movie
        })
      })
    })

    return { text, currentPage, movies, fields, rows, perPage, loading, error, search, goDetails, prev, next }
  }
})
</script>

<style scoped lang="scss">
  h2 {
    &.search {
      font-weight: bolder;
    }
  }
  .wrapper {
    display: flex;

    input {
      &.main {
        border-radius: 2px;
        border: 1px solid gray;
        display: flex;
        flex-grow: 1;
        padding: 2% 3%;
      }
    }

    a {
      color: #42b983;
    }
  }

  .sub-header {
    display: flex;
    justify-content: space-between;

    .actions {
      display: flex;
      flex-grow: 1;
      justify-content: flex-end;

      button {
        background: transparent;
        padding: 2% 5%;
      }
    }
  }

  table {

    ::v-deep(&#movies) {
      text-align: start;

      thead {
        display: none;
      }

      tbody {

        tr {

          td {
            padding-top: 1.5rem;
            border-bottom: 2px solid black;
          }
        }
      }
    }
  }

</style>
