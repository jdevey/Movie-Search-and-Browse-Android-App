import React, {Component} from 'react';
import {Text, View, Image, FlatList, ScrollView} from 'react-native';

import styles from '../styles/MyStyles';
import MovieSummary from './MovieSummary';
import movieService from '../services/movie.service';
import { MovieCast } from '../models/MovieCast';

export default class MovieDetail extends Component {
    static navigationOptions = {
        title: 'Movie Detail'
    }

    constructor(props) {
        super(props);
        this.state = {
            cast: [],
        }
    }

    componentWillMount() {
        this.data = this.props.navigation.state.params.data;
        movieService.getMovieCast(this.data.id)
        .then(results => {
            results = results.slice(0, 5);
            results.forEach(element => {
                this.setState({cast: [...this.state.cast, new MovieCast(element.id, null, element.name, element.character)]});
            })
        })
        .catch(e => {
            console.log("Failed to get movie cast");
            console.log(e);
        })
    }

    renderItem(item) {
        return (
            <Text style={{fontSize: 14}}>
                {item.item.name}
            </Text>
        )
    }

    renderCastItem(item) {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 12}}>{item.item.name} as {item.item.character}</Text>
                <Image source={{uri: item.item.imagePath ? `https://image.tmdb.org/t/p/w400/${item.item.imagePath}` :
                    'https://sterlingcomputers.com/wp-content/themes/Sterling/images/no-image-found-360x260.png'}} style={{height: 70, width: 100}}/>
            </View>
        )
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.detailed}>
                    <Text style={{fontSize: 20}}>{this.data.title}</Text>
                    <Text style={{fontSize: 14}}>Popularity: {this.data.popularity}</Text>
                    <Text style={{fontSize: 14}}>Release date: {this.data.releaseDate}</Text>
                    <Text style={{fontSize: 14}}>Overview: {this.data.overview}...</Text>
                    <Text style={{fontSize: 14}}>Budget: {this.data.budget}</Text>
                    <Text style={{fontSize: 14}}>Revenue: {this.data.revenue}</Text>
                    <Text style={{fontSize: 14}}>Status: {this.data.status}</Text>
                    <Text style={{fontSize: 14}}>Genres:</Text>
                    <FlatList
                        data={this.data.genres}
                        keyExtractor={(item, index) => item.id}
                        renderItem={this.renderItem}
                    />
                    <Image source={{uri: `https://image.tmdb.org/t/p/w400/${this.data.posterPath}`}} style={{height: 300, width: null}}/>
                    <Text style={{fontSize: 14}}>Cast:</Text>
                    <FlatList
                        data={this.state.cast}
                        keyExtractor={(item, index) => item.id}
                        renderItem={this.renderCastItem}
                    />
                </View>
            </ScrollView>
        )
    }
}