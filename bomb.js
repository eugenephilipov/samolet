import React, { Component }  from 'react';
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Animated,
} from 'react-native';
import animated_image from './images/star.png';

export default class Bomb extends Component {
  
  constructor(props) {      
    super(props);
  }
//, transform: [{ scale: (this.props.animated,this.props.animated)  }]
  render(){
  return <Animated.Image source={require('./images/path4208.png')}  /> ;
  }
}
