import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';

import styles from '../styles/MyStyles';
import movieService from '../services/movie.service';

export default class PersonSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: null
        }
    }

    componentWillMount() {
        movieService.getPersonImageByID(this.props.data.id)
        .then(result => {
            this.setState({imgUrl: result})
        })
        .catch(e => {
            console.log("Couldn't get the person's image");
            console.log(e);
        })
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('PersonDetail', {data: this.props.data, navigation: this.props.navigation})}>
                <ScrollView>
                    <View style={{margin: 10, flex: 1}}>
                        <Text style={{fontSize: 20}}>{this.props.data.name}</Text>
                        <Text style={{fontSize: 14}}>Popularity: {this.props.data.popularity}</Text>
                        <Image source={{uri: this.state.imgUrl ? `https://image.tmdb.org/t/p/w400/${this.state.imgUrl}` :
                        'https://sterlingcomputers.com/wp-content/themes/Sterling/images/no-image-found-360x260.png'}} style={{height: 300, width: null}}/>
                    </View>
                </ScrollView>
            </TouchableOpacity>
        )
    }
}
