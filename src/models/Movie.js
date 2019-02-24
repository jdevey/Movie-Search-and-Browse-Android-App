export class Movie {
    constructor(id, posterPath, title, popularity, releaseDate, overview, genres, budget, revenue, status, cast) {
        this.id = id;
        this.posterPath = posterPath;
        this.title = title;
        this.popularity = popularity;
        this.releaseDate = releaseDate;
        this.overview = overview;
        this.genres = genres;
        this.budget = budget;
        this.revenue = revenue;
        this.status = status;
        this.cast = cast;
    }
}
