import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import styles from '../styles/MyStyles';
import movieService from '../services/movie.service';

export default class Browse extends Component {
    static navigationOptions = {
        title: 'Browse for Genres'
    }

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getMovies();
    }

    getMovies() {
        movieService.getGenres()
        .then(results => {
            this.setState({data: results});
        })
        .catch(e => {
            console.log('Failed to grab genres');
            console.log(e);
        })
    }

    renderGenres() {
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => item.id}
                renderItem={this.renderItem}
                ListEmptyComponent={this.renderEmptyList}
            />
        );
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('GenreResults', {id: item.getID(), navigation: this.props.navigation})}>
                <Text style={{fontSize: 20}}>
                    {item.getName()}
                </Text>
            </TouchableOpacity>
        );
    }

    renderEmptyList = () => {
        return (
            <Text>Your genre list is empty! You fail!</Text>
        );
    }

    render() {
        return (
            <View>{this.renderGenres()}</View>
        );
    }
}