import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';

import styles from '../styles/MyStyles';
import movieService from '../services/movie.service';
import PersonSummary from './PersonSummary';

export default class PeopleResults extends Component {
    static navigationOptions = {
        title: 'People Search Results'
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pageCnt: 1
        }
    }

    componentDidMount() {
        this.searchForPeople();
    }

    searchForPeople(query, pageNum) {
        movieService.getPersonByName(this.props.navigation.state.params.query, this.state.pageCnt)
        .then(results => {
            this.setState({data: this.state.data.concat(results), pageCnt: this.state.pageCnt}); //TODO change back to plus one
        })
        .catch(e => {
            console.log("Failed to search for movies by name");
            console.log(e);
        })
    }

    renderPeople() {
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => item.id}
                renderItem={this.renderItem}
                ListEmptyComponent={this.renderEmptyList}
                onEndReached={() => this.searchForPeople()}
            />
        )
    }

    renderItem = ({item}) => {
        return (
            <PersonSummary data={item} navigation={this.props.navigation}/>
        )
    }

    renderEmptyList = () => {
        return (
            <Text>No people found to match that search! (Empty)</Text>
        );
    }

    render() {
        return (
            <View>{this.renderPeople()}</View>
        )
    }
}
