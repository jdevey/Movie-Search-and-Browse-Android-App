import React, {Component} from 'react';
import {Text, View, ScrollView, Image, FlatList} from 'react-native';

import styles from '../styles/MyStyles';
import movieService from '../services/movie.service';

export default class PersonDetail extends Component {
    static navigationOptions = {
        title: 'Person Detail'
    }

    constructor(props) {
        super(props);
        this.state = {
            imgUrl: null,
            credits: null
        }
    }

    componentWillMount() {
        this.data = this.props.navigation.state.params.data;
        movieService.getPersonImageByID(this.data.id)
        .then(result => {
            this.setState({imgUrl: result})
        })
        .catch(e => {
            console.log("Couldn't get the person's image");
            console.log(e);
        })
        movieService.getPersonCredit(this.data.id)
        .then(res => {
            this.setState({credits: res})
        })
        .catch(e => {
            console.log("Couldn't get the person's credits");
            console.log(e);
        })
    }

    renderCreditItem(item) {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 16}}>{item.item.title}</Text>
                <Text style={{fontSize: 12}}>{item.item.release_date}</Text>
                <Image source={{uri: item.item.poster_path ? `https://image.tmdb.org/t/p/w400/${item.item.poster_path}` :
                    'https://sterlingcomputers.com/wp-content/themes/Sterling/images/no-image-found-360x260.png'}} style={{height: 70, width: 100}}/>
            </View>
        )
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.detail}>
                    <Text style={{fontSize: 20}}>{this.data.name}</Text>
                    <Text style={{fontSize: 14}}>Popularity: {this.data.popularity}</Text>
                    <Text style={{fontSize: 14}}>Birthday: {this.data.birth}</Text>
                    <Text style={{fontSize: 14}}>Deathday: {this.data.death}</Text>
                    <Text style={{fontSize: 14}}>Place of Birth: {this.data.placeOfBirth}</Text>
                    <Text style={{fontSize: 14}}>Biography: {this.data.biography}</Text>
                    <Image source={{uri: this.state.imgUrl ? `https://image.tmdb.org/t/p/w400/${this.state.imgUrl}` :
                        'https://sterlingcomputers.com/wp-content/themes/Sterling/images/no-image-found-360x260.png'}} style={{height: 300, width: null}}/>
                    <Text style={{fontSize: 20}}>Credits:</Text>
                    <FlatList
                        data={this.state.credits}
                        keyExtractor={(item, index) => item.credit_id}
                        renderItem={this.renderCreditItem}
                    />
                </View>
            </ScrollView>
        )
    }
}
