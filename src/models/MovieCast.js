import movieService from '../services/movie.service';

export class MovieCast {
    constructor(id, imagePath, name, characterName) {
        this.id = id;
        this.name = name;
        this.characterName = characterName;
        if (imagePath == null) {
            movieService.getPersonImageByID(id)
            .then(function(result){
                this.imagePath = result;
            }.bind(this));
        }
    }
}