import { IMovie } from "./movie";

export interface IMoviesResponse {
    Response: string,
    Search: IMovie[],
    totalresults: number
    Error?: any
}
