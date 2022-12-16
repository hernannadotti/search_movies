import { IMovie } from '@/models/movie'
import { IMoviesResponse } from '@/models/moviesResponse'
import axios from 'axios'
import { ComputedRef } from 'vue'

export default {
  async searchMovie (page: number, text: ComputedRef<string>): Promise<IMoviesResponse> {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=d2e9bfa0&page=${page}&type=movie&r=json&s=${text.value}`)
    return response.data
  },

  async searchMovieById (id: string | string[]): Promise<IMovie> {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=d2e9bfa0&i=${id}&plot=full`)
    return response.data
  }
}
