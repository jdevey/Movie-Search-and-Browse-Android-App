import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';

import styles from '../styles/MyStyles';
import movieService from '../services/movie.service';
import MovieSummary from './MovieSummary';

export default class MovieResults extends Component {
    static navigationOptions = {
        title: 'Movie Search Results'
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pageCnt: 1
        }
    }

    componentDidMount() {
        this.searchForMovies();//this.props.navigation.state.params.query, this.state.pageCnt);
    }

    searchForMovies(){//query, pageNum) {
        movieService.getMovieByName(this.props.navigation.state.params.query, this.state.pageCnt)
        .then(results => {
            this.setState({data: this.state.data.concat(results), pageCnt: this.state.pageCnt + 1});
        })
        .catch(e => {
            console.log("Failed to search for movies by name");
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
                onEndReached={() => this.searchForMovies()}//getMoviesByGenre()}
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
            <Text>No movies found to match that search! (Empty)</Text>
        );
    }

    render() {
        return (
            <View>{this.renderMovies()}</View>
        )
    }
}
