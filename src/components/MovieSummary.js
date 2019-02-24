import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from '../styles/MyStyles';

export default class MovieSummary extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MovieDetail', {data: this.props.data, navigation: this.props.navigation})}>
                <View style={{margin: 10}}>
                    <Text style={{fontSize: 20}}>
                        {this.props.data.title}
                    </Text>
                    <Text style={{fontSize: 14}}>
                        Popularity: {this.props.data.popularity}
                    </Text>
                    <Text style={{fontSize: 14}}>
                        Release date: {this.props.data.releaseDate}
                    </Text>
                    <Text style={{fontSize: 14}}>
                        Overview: {this.props.data.overview.substr(0, 100)}...
                    </Text>
                    <Image source={{uri: `https://image.tmdb.org/t/p/w400/${this.props.data.posterPath}`}} style={{height: 300, width: null}}/>
                </View>
            </TouchableOpacity>
        )
    }
}
