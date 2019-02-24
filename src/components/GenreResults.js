import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import styles from '../styles/MyStyles';
import movieService from '../services/movie.service';
import MovieSummary from './MovieSummary';


export default class GenreResults extends Component {
    static navigationOptions = {
        title: 'Genre selection'
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pageCnt: 1
        }
    }

    componentDidMount() {
        this.getMoviesByGenre();
    }

    getMoviesByGenre() {
        movieService.getMoviesByGenre(this.props.navigation.state.params.id, this.state.pageCnt)
        .then(results => {
            this.setState({data: this.state.data.concat(results), pageCnt: this.state.pageCnt + 1});
        })
        .catch(e => {
            console.log("Failed to gr movie by genre");
            console.log(e);
        })
    }

    renderMovies() {
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => item.id}
                renderItem={this.renderItem}
                ListEmptyComponent={this.renderEmptyList}
                onEndReached={() => this.getMoviesByGenre()}
            />
        )
    }

    renderItem = ({item}) => {
        return (
            <MovieSummary data={item} navigation={this.props.navigation}/>
        )
    }

    renderEmptyList = () => {
        return (
            <Text>No movies found to match that genre! (Empty)</Text>
        );
    }

    render() {
        return (
            <View>{this.renderMovies()}</View>
        )
    }
}
