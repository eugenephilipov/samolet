import React, { Component }  from 'react';
import {
  StyleSheet,
  Image,
  Animated,
} from 'react-native';

export default class animated_image_obj extends Component {
  render(){
  return( 
            <Animated.Image  source={this.props.source}
              style={{                              
                position: 'absolute',
                height: this.props.height,
                width: this.props.width,
                left:this.props.left,
                top:this.props.top,                          
              }} />         
        );          
  }  
}
