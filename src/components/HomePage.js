import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from '../styles/MyStyles';

export default class MovieSummary extends Component {
    static navigationOptions = {
        title: 'MovieMania'
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.centered}>
                <Text style={{ fontSize: 24 }}>Welcome to MovieMania!</Text>
            </View>
        )
    }
}
