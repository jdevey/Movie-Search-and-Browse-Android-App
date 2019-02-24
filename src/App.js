import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomePage from './components/HomePage';
import Browse from './components/Browse';
import Search from './components/Search';
import GenreResults from './components/GenreResults';
import MovieResults from './components/MovieResults';
import PeopleResults from './components/PeopleResults';
import MovieSummary from './components/MovieSummary';
import MovieDetail from './components/MovieDetail';
import PersonSummary from './components/PersonSummary';
import PersonDetail from './components/PersonDetail';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Bottom />
    );
  }
}

const TabOne = createStackNavigator(
  {
      Browse: Browse,
      GenreResults: GenreResults,
      MovieSummary: MovieSummary,
      MovieDetail: MovieDetail,
      PersonSummary: PersonSummary,
      PersonDetail: PersonDetail
  }
)

const TabTwo = createStackNavigator(
  {
      Search: Search,
      MovieResults: MovieResults,
      PeopleResults: PeopleResults,
      MovieSummary: MovieSummary,
      MovieDetail: MovieDetail,
      PersonSummary: PersonSummary,
      PersonDetail: PersonDetail
  }
)

const Home = createStackNavigator(
  {
    Home: HomePage
  }
)

const Root = createBottomTabNavigator(
  {
      // Left: How it'll appear on the bottom of the screen (route name)
      // Right: The stack navigator name
      Home: Home,
      Browse: TabOne,
      Search: TabTwo
  },
  {
      defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName; 
            if (routeName == 'Home') iconName = 'home';
            if (routeName === 'Browse') iconName = 'list';
            else if (routeName === 'Search') iconName = 'search';
            
            return <MaterialIcons name={iconName} size={25} color={tintColor} />;
          },
        }),
        tabBarOptions: {
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        },
      },
      {
        initialRouteName: 'HomePage'
      }
);

const Bottom = createAppContainer(Root);