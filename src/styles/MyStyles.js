import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    counter: {
      fontFamily: 'Arial',
      fontSize: 30,
      textAlign: 'center',
      margin: 10,
      color: 'green'
    },
    button: {
      alignItems: 'center',
      backgroundColor: 'lightblue',
      padding: 10,
      margin: 15,
      borderWidth: 5,
      borderColor: 'blue'
    },
    message: {
      fontFamily: 'Arial',
      fontSize: 25,
      textAlign: 'center',
      color: 'blue'
    },
    tile: {
      width: 60,
      height: 60,
      borderRadius: 10,
      margin: 5
    },
    grd: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    scoreboard: {
      fontFamily: 'Arial',
      fontSize: 25,
      textAlign: 'center',
      color: 'black',
      padding: 25
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center' 
    },
    detail: {
      margin: 10,
      flex: 1
    }
});

