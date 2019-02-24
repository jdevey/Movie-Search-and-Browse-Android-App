let ApiService = class ApiService {
    constructor() {
        //this.apiProtocol = 'https:';
        //this.apiHost = 'facebook.github.io/react-native';
        this.apiKey = '1e380492290ab84f7149ea87372fa39f'
    }/*
    get apiLocation() {
        return `${this.apiProtocol}//${this.apiHost}`;
    }
    getMovieList() {
        return `${this.apiLocation}/movies.json`;
    }*/
    getGenreList() {
        return 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + this.apiKey;
    }
    getMoviesByGenre(genreID, pageNum) {
        return 'https://api.themoviedb.org/3/discover/movie?api_key=' + this.apiKey +
        '&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + pageNum + '&with_genres=' + genreID;
    }
    getMovieByName(query, pageNum) {
        return 'https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey +
        '&include_adult=false&page=' + pageNum + '&query=' + query;
    }
    getPersonByName(query, pageNum) {
        var s = 'https://api.themoviedb.org/3/search/person?api_key=' + this.apiKey +
        '&include_adult=false&page=' + pageNum + '&query=' + query;
        console.log(s);
        return 'https://api.themoviedb.org/3/search/person?api_key=' + this.apiKey +
        '&include_adult=false&page=' + pageNum + '&query=' + query;
    }
    getMovieByID(id) {
        return 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + this.apiKey;
    }
    getPersonByID(id) {
        return 'https://api.themoviedb.org/3/person/' + id + '?api_key=' + this.apiKey;
    }
    getPersonImageByID(id) {
        return 'https://api.themoviedb.org/3/person/' + id + '/images?api_key=' + this.apiKey;
    }
    getMovieCast(id) {
        return 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + this.apiKey;
    }
    getPersonCredit(id) {
        return 'https://api.themoviedb.org/3/person/' + id + '/movie_credits?api_key=' + this.apiKey;
    }
}

const apiService = new ApiService();
export default apiService;
