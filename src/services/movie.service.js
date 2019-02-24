import apiService from './api.service';
import {Movie} from '../models/Movie';
import {Genre} from '../models/Genre';
import { Person } from '../models/Person';
import { MovieCast } from '../models/MovieCast';
import { PersonCredit } from '../models/PersonCredit';

let MovieService = class MovieService {
    constructor() {}

    getGenres() {
        return new Promise((resolve, reject) => {
            fetch(apiService.getGenreList())
            .then((response) => response.json())
            .then((response) => {
                let items = [];
                response.genres.forEach(element => {
                    items.push(new Genre(element.id, element.name));
                });
                resolve(items);
            })
            .catch((e) => {
                console.log("Failed to grab genres");
                console.error(e);
                reject(e);
            })
        });
    }

    getMoviesByGenre(id, pageNum) {
        return new Promise((resolve, reject) => {
            let items = [];
            fetch(apiService.getMoviesByGenre(id, pageNum))
            .then((response) => response.json())
            .then((response) => {
                response.results.forEach(element => {
                    this.getMovieByID(element.id)
                    .then(res => {
                        items.push(res);
                        if (response.results.length == items.length)
                            resolve(items);
                    })
                    .catch(e => {
                        console.log("Failed in inner promise");
                        console.log(e);
                    })
                })
            })
            .catch((e) => {
                console.log("Failed to grab movies by genre");
                console.log(e);
                reject(e);
            })
        });
    }

    getMovieByName(query, pageNum) {
        return new Promise((resolve, reject) => {
            let items = [];
            fetch(apiService.getMovieByName(query, pageNum))
            .then((response) => response.json())
            .then((response) => {
                response.results.forEach(element => {
                    this.getMovieByID(element.id)
                    .then(res => {
                        items.push(res);
                        if (response.results.length == items.length)
                            resolve(items);
                    })
                    .catch(e => {
                        console.log("Failed in inner promise");
                        console.log(e);
                    })
                })
            })
            .catch((e) => {
                console.log("Failed to grab movies by name");
                console.log(e);
                reject(e);
            })
        });
    }

    getPersonByName(query, pageNum) {
        return new Promise((resolve, reject) => {
            let items = [];
            fetch(apiService.getPersonByName(query, pageNum))
            .then((response) => response.json())
            .then((response) => {
                response.results.forEach(element => {
                    this.getPersonByID(element.id)
                    .then(res => {
                        items.push(res);
                        if(response.results.length == items.length)
                            resolve(items);
                    })
                    .catch(e => {
                        console.log("Failed in inner promise");
                        console.log(e);
                    })
                })
            })
            .catch((e) => {
                console.log("Failed to grab person by name");
                console.log(e);
                reject(e);
            })
        });
    }

    getMovieByID(id) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getMovieByID(id))
            .then((response) => response.json())
            .then((response) => {
                cast = null;//this.getMovieCast(response.id); //TODO fix this... too many requests
                let item = new Movie(response.id, response.poster_path, response.title, response.popularity, response.release_date,
                    response.overview, response.genres, response.budget, response.revenue, response.status, cast);
                resolve(item);
            })
            .catch((e) => {
                console.log("Failed to grab movies by id");
                console.log(e);
                reject(e);
            })
        });
    }

    getPersonByID(id) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getPersonByID(id))
            .then((response) => response.json())
            .then((response) => {
                image_path = null;
                credits = null;
                let item = new Person(response.id, response.name, response.popularity, image_path, response.birthday,
                    response.deathday, response.place_of_birth, response.biography, credits);
                resolve(item);
            })
            .catch((e) => {
                console.log("Failed to grab person by id");
                console.log(e);
                reject(e);
            })
        });
    }

    getPersonImageByID(id) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getPersonImageByID(id))
            .then((response) => response.json())
            .then((response) => {
                if (response.length == 0 || response.profiles == 0 || response.profiles[0] == 0 || response.profiles[0].file_path == 0)
                    resolve(null);
                else
                    resolve(response.profiles[0].file_path);
            })
            .catch((e) => {
                console.log("Failed to grab person image by id");
                console.log(e);
                reject(e);
            })
        });
    }

    getMovieCast(id) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getMovieCast(id))
            .then((response) => response.json())
            .then((response) => {
                data = [];
                response.cast.forEach((element) => {
                    data.push(element);
                })
                resolve(data);
            })
            .catch((e) => {
                console.log("Failed to grab movie cast");
                console.log(e);
                reject(e);
            })
        });
    }

    getPersonCredit(id) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getPersonCredit(id))
            .then((response) => response.json())
            .then((response) => {
                data = [];
                response.cast.forEach((element) => {
                    data.push(element);
                })
                resolve(data);
            })
            .catch((e) => {
                console.log("Failed to grab person credit");
                console.log(e);
                reject(e);
            })
        });
    }
}

const movieService = new MovieService();
export default movieService;
