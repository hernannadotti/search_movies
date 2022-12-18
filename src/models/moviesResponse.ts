import { IMovie } from "./movie";

export interface IMoviesResponse {
    Response: string,
    Search: IMovie[],
    totalResults: number
    Error?: any
}
