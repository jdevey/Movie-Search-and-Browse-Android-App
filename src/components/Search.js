import React, {Component} from 'react';
import {Text, TouchableOpacity, View, TextInput} from 'react-native';
import styles from '../styles/MyStyles';

export default class Search extends Component {
    static navigationOptions = {
        title: 'Search for Movies or People'
    }
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }
    render() {
        return (
            <View style={styles.centered}>
                <TextInput style={{borderColor: 'black', borderWidth: 2, height: 40, width: 150}}
                    onChangeText={(text) => this.setState({input: text})} maxLength={100} value={this.state.input}/>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('MovieResults', {query: encodeURI(this.state.input)})}>
                    <Text style={{fontSize: 20}}>Search Movies</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('PeopleResults', {query: encodeURI(this.state.input)})}>
                    <Text style={{fontSize: 20}}>Search People</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
