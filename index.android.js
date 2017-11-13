/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * react-native run-android
 * react-native log-android
 * npm start
 * c:\Users\philipoe\Documents\Visual Studion Code\react\AwesomeProject\android>gradlew.bat assembleRelease
 * c:\Users\philipoe\Documents\Visual Studion Code\react\AwesomeProject\android>magick.exe convert map4.png +gravity  -crop 1000x1000  mapd_%d.png
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  Animated,
  Easing,
  TouchableHighlight,
  PanResponder
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
//import animated_image_obj from './js/animated_image_obj';
import animated_image from './js/animated_image';
import { WebView } from 'react-native';
import Bomb from './bomb';
var crop_images = require('./js/crop_images').crop_images;

var AppComponent1 = require("./js/app.component");
var game_component = new AppComponent1.AppComponent();

///////////////////


const fs = RNFetchBlob.fs

/*
<Image source={{uri: `data:image/gif;base64,${imagePath}`}} />
*/
///////////////////
var static_pictures = {
  samolet_nem: { source: require('./images/samolet_nem.png'), width: 65, height: 79 },
  tank_nem: { source: require('./images/tank_nem.png'), width: 52, height: 88 },
  //map:{source:{uri: imagePath},width:778,height:11341},
  map: { source: require('./images/map.png'), width: 778, height: 11341 },
  //map:{source:require('./images/map3.png'),width:643,height:2166},
  //map:{source:require('mapxm.jpg'),width:778,height:11341}
};


var animated_images = new Array();

game_component.player_figures[0].man_play_figure.image_sources = [{ step_px: 20, width: 26, length: 76, event: 'move', source: require('./images/kosmolet_mob.png'), live_iter: 30, iteration_count: 0, active_heigth: null }];

game_component.meteor_play_figures[1].image_sources = [{ step_px: 3, width: 40, length: 40, event: 'move', source: require('./images/star.png'), live_iter: 5, iteration_count: 0, active_heigth: null }];
game_component.meteor_play_figures[1].coord_x = 0;
game_component.meteor_play_figures[1].coord_y = 0;
game_component.meteor_play_figures[1].play_type = 'flying_obj';
game_component.meteor_play_figures[1].figure_outline = 'star';

export class AnimatedImageOpacity extends Component {

  render() {
    return (
      <Image source={this.props.source}
        style={{
          position: 'absolute',
          top: this.props.top,
          left: this.props.left,
          width: this.props.width,
          height: this.props.height
        }} />
    );
  }
}
/*
export class ImageObj extends Component {
  render(){
  return(  
          <Animated.Image top={this.props.top} left={this.props.left} source={this.props.source} visibility={this.props.visibility} style={styles.play_figure}/>           
        );          
  }  
}
*/

var box = {};
box.width = (game_component.standard.bottom * 2 * 10);
box.height = box.width;
box.x0 = -box.width / 2 + game_component.standard.right / 2;
box.y0 = -box.height / 2 + game_component.standard.bottom / 2;
box.center_x = box.width / 2;
box.center_y = box.height / 2;
box.screen_height = game_component.standard.bottom;
box.screen_width = game_component.standard.right;
box.ground_center_x = box.center_x;//game_component.standard.bottom;
box.ground_center_y = box.center_y;
box.ground_x0 = 0;
box.ground_max_x = box.width;
box.ground_max_y = box.height;
box.ground_y0 = 0;

box.screen_center_x = -1 * (game_component.standard.bottom - game_component.standard.right / 2) + game_component.standard.bottom;
box.screen_center_y = (-1 * game_component.standard.bottom / 2) + game_component.standard.bottom;
box.bomb_distance = (box.screen_height / 12) * 2;


console.log('startXXXXXXXXXXXXXXXXXXXXXX: bottom:' + game_component.standard.bottom + ';right:' + game_component.standard.right + ';box.x0:' + box.x0 + ';box.height:' + box.height + ';box.width:' + box.width + ';box.screen_height' + box.screen_height + ';box.screen_width:' + box.screen_width);

var flight = {};
flight.refresh_msec = 100;//0.2;
flight.koef = 0; // height or Y koef 
flight.koef_x = 0;// left right speed koef
flight.const_speed = 40;
flight.max_height = 10000;
flight.correction_koef = flight.max_height / 1000;
flight.height = 10;
flight.x = 0;//-box.ground_max_x/2-box.screen_width/2;//box.center_x+350//game_component.standard.bottom*10;//box.ground_center_x;
flight.ground_move_x = 0;
flight.ground_move_speed_koef = 1;
flight.scaling = 0.1;
flight.x_correction = 0;
flight.y_correction = 0;
flight.ground_move_msec = 100000;
flight.speed = box.height / flight.ground_move_msec;
flight.bomb_speed = flight.speed;

flight.calc_scaling = () => {
  //flight.scaling=1;  
  flight.scaling = flight.height / flight.max_height;
  if (flight.scaling > 1) flight.scaling = 1;
  if (flight.scaling < 0) flight.scaling = 0;
}
flight_correction_of_scale = () => {
  var mk = 1;
  var shift_c;
  flight.x_correction = 0;
  if (flight.koef != 0 && flight.height > 0 && flight.height <= flight.max_height) {
    shift_c = (box.center_y + cur_value.y) / 2;
    //if (flight.koef>0) 
    mk = -1;
    //if (flight.koef>0) shift_c=shift_c*(-1);

    flight.x_correction = mk * (box.ground_max_x - (flight.scaling * box.ground_max_x)) / 2 - mk * ((box.ground_center_x) - flight.scaling * (box.ground_center_x)) + mk * shift_c * 1.5 / flight.correction_koef;
  }

  //else flight.y_correction=mk*shift_c*(box.screen_height/box.screen_width);
  //console.log('flight.height:'+flight.height+';flight.koef:'+flight.koef+';shift_c:'+shift_c+';this.cur_value:'+cur_value.y+';box.screen_height'+box.screen_height+';box.x0:'+box.x0+';box.center_y:'+box.center_y);
}
flight_correction_of_scale_y = () => {
  var mk = 1;
  var shift_c;
  flight.y_correction = 0;
  if (flight.koef != 0 && flight.height > 0 && flight.height <= flight.max_height) {

    shift_c = (box.center_y + cur_value.y) / 2;
    mk = -1;
    flight.y_correction = mk * (box.ground_max_y - (flight.scaling * box.ground_max_y)) / 2 - mk * ((box.ground_center_y) - flight.scaling * (box.ground_center_y)) + mk * shift_c * (box.screen_height / box.screen_width) / flight.correction_koef;
  }
  //else flight.y_correction=mk*shift_c*(box.screen_height/box.screen_width);
}

flight.calc_height = () => {

  //if (flight.max_height<=flight.koef*flight.const_speed && flight.koef*flight.const_speed>=0)
  flight.height = flight.height + flight.koef * flight.const_speed;
  if (flight.max_height <= flight.height) flight.height = flight.max_height;
  if (flight.height < (0.1 * flight.max_height)) flight.height = 0.1 * flight.max_height;
  //flight.calc_scaling();

  flight_correction_of_scale();
  flight_correction_of_scale_y();

};
flight.calc_x = () => {

  flight.x = flight.x + flight.koef_x * flight.const_speed;//- flight.scaling*flight.koef_x*flight.const_speed
  //if (box.ground_max_x<flight.x) flight.x=0;
  //if (flight.x<0) flight.x=box.ground_max_x;
  flight_correction_of_scale();
  flight_correction_of_scale_y();
};
flight.set_koef = (current_y) => {
  if (Math.abs(current_y) < Math.abs(box.center_y))
    flight.koef = ((Math.abs(box.center_y) - Math.abs(current_y)) / (box.screen_height / 2)) * flight.refresh_msec / 100;
  if (Math.abs(current_y) > Math.abs(box.center_y))
    flight.koef = ((Math.abs(box.center_y) - Math.abs(current_y)) / (box.screen_height / 2)) * flight.refresh_msec / 100;
  //flight.koef=Math.round(flight.koef,3);
};
flight.set_koef_x = (current_x) => {
  flight.koef_x = -1 * (current_x / (box.screen_width / 2)) * flight.refresh_msec / 100;
  //flight.koef=Math.round(flight.koef,3);
};

flight.ground_move = () => {
  flight.ground_move_x = flight.ground_move_x + flight.ground_move_speed_koef * flight.const_speed;
};

var cur_value = { y: 0 };

draw_many_objects = () => {
  var step_x = 778;//778
  var step_y = 1000;//  
  var count = 0;
  var shift = 1500;
  for (var y = 0; y < box.ground_max_y; y = y + step_y)
    //for (var x=box.center_x-shift;x<box.center_x+shift;x=x+step_x){  
    for (var x = box.center_x; x <= box.center_x; x = x + step_x) {
      //var name='./images/mapd_'+count+'.png';  
      // {source:require(name),width:1000,height:1000}
      if (count < crop_images.batles[0].images.length)//
        animated_images.push(new animated_image(crop_images.batles[0].images[count], y, x));//box.ground_max_y/2-200,(game_component.standard.bottom-65/2)
      count++;
      //animated_images.push(new animated_image(static_pictures.tank_nem,y,x));//box.ground_max_y/2-200,(game_component.standard.bottom-65/2)
    }
}

draw_many_objects2 = () => {
  var step_x = 200;//778
  var step_y = 500;//  
  var count = 0;
  var shift = 1500;
  for (var y = 0; y < box.ground_max_y; y = y + step_y)
    //for (var x=box.center_x-shift;x<box.center_x+shift;x=x+step_x){  
    for (var x = box.center_x; x <= box.center_x; x = x + step_x) {
      //var name='./images/mapd_'+count+'.png';  
      // {source:require(name),width:1000,height:1000}
      //if (count<crop_images.batles[0].images.length)//
      animated_images.push(new animated_image(static_pictures.samolet_nem, y, x));//box.ground_max_y/2-200,(game_component.standard.bottom-65/2)
      count++;
      //animated_images.push(new animated_image(static_pictures.tank_nem,y,x));//box.ground_max_y/2-200,(game_component.standard.bottom-65/2)
    }
}


draw_map_objects = () => {
  var step_x = 778;//400    
  var shift = 0;
  for (var x = 0; x < 3 * step_x; x = x + step_x) {
    animated_images.push(new animated_image(static_pictures.map, 0, x));//box.ground_max_y/2-200,(game_component.standard.bottom-65/2)  
  }
}

draw_many_objects();
//draw_map_objects();
draw_many_objects2();
export default class AwesomeProject extends Component {

  constructor(props) {
    var bombs;
    super(props);
    this.state = {
      src: null, // empty data array,
      bombing: 0,
      bomb_y: 0
    };
    this.compensDelta = 0;
    this.bombs = new Array();
    //this.state = {object : game_component.meteor_play_figures };
    this.button_fireXY = { x0: 0, dx: 100, y0: game_component.standard.bottom, dy: 100 };
    this.state = { object: game_component.meteor_play_figures, flight_height: flight.height };
    this.disapearValue = new Animated.Value(1);
    this.animatedValue = new Animated.ValueXY({ x: 0, y: 0 });

    this.targetValue = new Animated.Value(0);
    this.animatedFire = new Animated.Value(0);
    this.animatedShipValue = new Animated.ValueXY({ x: 0, y: box.center_y });//box.height/2

    this.animatedScaling = new Animated.Value(flight.scaling);
    this.animatedScalingCom = new Animated.Value(1 / flight.scaling);
    this.animatedX = new Animated.Value(0);
    this.animatedY = new Animated.Value(0);
    this.animatedGroundMoveX = new Animated.Value(flight.x);

    this.animatedGroundMove = new Animated.Value(-box.ground_max_y / 2);
    this.animatedGroundMoveCompens = new Animated.Value(0);

    for (let i = 0; i <= 2; i++) {
      this.bombs.push({
        animatedBomb: new Animated.Value(0.1),
        animatedBombY: new Animated.Value(-box.ground_max_x / 2),
        animatedBombX: new Animated.Value(box.center_x),
        animatedBombOpacity: new Animated.Value(0),
        animatedBombBlastOpacity: new Animated.Value(0)
      }
      );
    }

    this.cur_value = { x: 0, y: box.center_y };
    this.cur_value_target = 0;
    this.cur_value_ground_move = -box.ground_max_y / 2;
    this.cur_value_scaling = flight.scaling;

    this.player_gesture_last = { x: 0, y: 0 };
    //this.ship_value = {x: game_component.player_figures[0].man_play_figure.coord_x, y: game_component.player_figures[0].man_play_figure.coord_y};
    this.cur_value_animatedGroundMoveCompens = 0;


    this.animatedShipValue.addListener((value) => {
      this.cur_value = value;
      cur_value = value;
    }
    );
    this.targetValue.addListener((value) => {
      this.cur_value_target = value;
    }
    );
    this.animatedGroundMove.addListener((value) => {
      this.cur_value_ground_move = value;
    }
    );

    this.animatedScaling.addListener((value) => {
      this.cur_value_scaling = value;

    }
    );

    this.animatedGroundMoveX.addListener((value) => {
      this.cur_value_ground_moveX = value;
    }
    );

    this.animatedGroundMoveCompens.addListener((value) => {
      this.cur_value_animatedGroundMoveCompens = value;
    }
    );


    this.ground_move(-box.ground_max_y / 2, box.ground_max_y / 2, flight.ground_move_msec, this.animatedGroundMove);
    //this.loadImage();

    //this.ground_move(-box.ground_max_y/2,box.ground_max_y/2,flight.ground_move_msec,this.animatedGroundMove);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
      onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
      onPanResponderStart: (e, gestureState) => {
        //if (game_component.main_service.check_point_match(this.button_fireXY.x0,this.button_fireXY.dx,this.button_fireXY.y0,this.button_fireXY.dy,gestureState.x0,gestureState.y0))
        //console.log('grant fire:,x0:'+gestureState.x0 + ',y0:'+gestureState.y0);
        //this.disaper();
        //console.log('RStouchH:'+e.touchHistory.touchBank.length); 
      },
      onPanResponderGrant: (e, gestureState) => {
        //console.log('grant stateID:'+gestureState.stateID + ',x0:'+gestureState.x0 + ',y0:'+gestureState.y0);
        // if (!game_component.main_service.check_point_match(this.button_fireXY.x0,this.button_fireXY.dx,this.button_fireXY.y0,this.button_fireXY.dy,gestureState.x0,gestureState.y0))          
        this.player_gesture_last = { x: 0, y: 0 };
        this.player_gesture_last_target = 0;
      },
      onPanResponderMove: (evt, gestureState) => {
        //console.log('touchH:'+evt.touchHistory.touchBank.length)       
        //console.log('velocityx:' + gestureState.vx + ',dx:' + gestureState.dx  + ',y:' + gestureState.vy + ',dy:' + gestureState.dy);
        //if (!game_component.main_service.check_point_match(this.button_fireXY.x0,this.button_fireXY.dx,this.button_fireXY.y0,this.button_fireXY.dy,gestureState.x0,gestureState.y0)){
        //game_component.player_figures[0].animated_move_object(gestureState.dx-this.player_gesture_last.x ,gestureState.dy-this.player_gesture_last.y);
        //this.player_gesture_last={x:gestureState.dx ,y:gestureState.dy};  
        //console.log('ccf:'+this.animatedValue.y);

        this.animatedShipValue.setValue({ x: (this.cur_value.x + gestureState.dx - this.player_gesture_last.x), y: (this.cur_value.y + gestureState.dy - this.player_gesture_last.y) });
        this.targetValue.setValue((this.cur_value.x + gestureState.dx - this.player_gesture_last.x));
        //this.animatedShipValue.setOffset({x:0, y: this.cur_value.y + gestureState.dy-this.player_gesture_last.y });
        //console.log('ccKK:'+(this.cur_value.x +  gestureState.dx -this.player_gesture_last.x) );
        this.player_gesture_last = { x: gestureState.dx, y: gestureState.dy };
        this.player_gesture_last_target = gestureState.dx;
        flight.set_koef((this.cur_value.y + gestureState.dy - this.player_gesture_last.y));
        flight.set_koef_x((this.cur_value.x + gestureState.dx - this.player_gesture_last.x));


        ///////////////
        this.set_move();
        //////////////

        //flight.calc_height();
        //flight.calc_scaling();
        ///flight.calc_x();

        //console.log ('flight.height:'+flight.height + 'flight.scaling:' +flight.scaling+ ';flight.x_correction:' + (-1*flight.x_correction) + 'koef_x:' + flight.koef_x + ';current_y:' + this.cur_value.x + ';box.ground_center_x' + box.ground_center_x );
        //this.animatedX.setValue(flight.x_correction);
        //this.animatedY.setValue(flight.y_correction);

        this.animatedScaling.setValue(flight.scaling);
        this.animatedScalingCom.setValue(1 / flight.scaling);

        //}
      }
      /*
      Animated.event([
        null, {dx: this.animatedShipValue.x, dy: this.animatedShipValue.y}
      ]), // Creates a function to handle the movement and set offsets
      */
      ,
      onPanResponderRelease: (evt, gestureState) => {
        // console.log('release stateID:'+gestureState.stateID + ',x0:'+gestureState.x0 + ',y0:'+gestureState.y0);
        //this._animatedValue.flattenOffset(); // Flatten the offset so it resets the default positioning
        //if (game_component.main_service.check_point_match(this.button_fireXY.x0,this.button_fireXY.dx,this.button_fireXY.y0,this.button_fireXY.dy,gestureState.x0,gestureState.y0))        
        //this.appear();    
        //console.log('ReltouchH:'+evt.touchHistory.touchBank.length)       
      }
    });

    /*
       setInterval(()=>{
    this.setState({flight_height:'sc:'+this.cur_value_scaling.value+';'});
    
       },2000);
    */
    setInterval(() => {
      this.set_move();

      if (this.cur_value_ground_move.value >= box.ground_max_y / 2) {
        //this.ground_move(-box.ground_max_y / 2, box.ground_max_y, flight.ground_move_msec, this.animatedGroundMove);
        this.ground_move(-box.ground_max_y / 2, box.ground_max_y / 2, flight.ground_move_msec, this.animatedGroundMove);
      }
    }, flight.refresh_msec);

    //this.animate();
  }

  firestrike(anime) {
    anime.setValue(0);
    Animated.timing(

      anime,
      {
        delay: 50,
        toValue: 100,
        duration: 250,
        easing: Easing.linear
      }
    ).start(() => {
      Animated.delay(200);
      anime.setValue(0);
    });
  }


  loadImage() {
    let imagePath = null
    var b64 = null;
    RNFetchBlob
      .config({
        fileCache: true
      })
      .fetch('GET', 'https://dry-island-42949.herokuapp.com/map.jpg')
      // the image is now dowloaded to device's storage
      .then((resp) => {
        // the image path you can use it directly with Image component
        imagePath = resp.path()
        return resp.readFile('base64')
      })
      .then((base64Data) => {
        // here's base64 encoded image
        console.log('ipath' + imagePath)

        //console.log(`data:image/gif;base64,${imagePath}`)
        b64 = base64Data;


        this.setState({
          src:
          { uri: `data:image/jpeg;base64,${base64Data}` }
        });

        // remove the file from storage


        //return fs.unlink(imagePath)
      });



  }

  loadImageFull(url, ) {
    let imagePath = null
    var b64 = null;
    //'https://dry-island-42949.herokuapp.com/map.jpg'
    RNFetchBlob
      .config({
        fileCache: true
      })
      .fetch('GET', url)
      // the image is now dowloaded to device's storage
      .then((resp) => {
        // the image path you can use it directly with Image component
        imagePath = resp.path()
        return resp.readFile('base64')
      })
      .then((base64Data) => {
        // here's base64 encoded image
        console.log('ipath' + imagePath)

        //console.log(`data:image/gif;base64,${imagePath}`)
        b64 = base64Data;


        this.setState({
          src:
          { uri: `data:image/jpeg;base64,${base64Data}` }
        });

        // remove the file from storage


        return fs.unlink(imagePath)
      });



  }

  set_move() {
    flight.calc_height();
    flight.calc_x();
    flight.calc_scaling();

    this.animatedX.setValue(flight.x_correction);
    this.animatedY.setValue(flight.y_correction);

    this.animatedScaling.setValue(flight.scaling);
    this.animatedScalingCom.setValue(1 / flight.scaling);
    this.animatedGroundMoveX.setValue(flight.x);

    //console.log('val:'+val+ ';this.compensDelta:'+this.compensDelta+';this.cur_value_ground_move:'+this.cur_value_ground_move.value);


  }

  appear() {
    //this.disapearValue.setValue(0);
    Animated.timing(
      this.disapearValue,
      {
        toValue: 1,
        duration: 2,
        delay: 0,
        easing: Easing.linear
      }
    ).start(game_component.meteor_play_figures[3].object_continue_move());
  }


  disaper() {
    //this.disapearValue.setValue(0);
    Animated.timing(
      this.disapearValue,
      {
        toValue: 0,
        duration: 2,
        delay: 0,
        easing: Easing.linear
      }
    ).start(game_component.meteor_play_figures[3].set_hidden_prop());
  }



  ground_move(from_value, to_y, p_duration, anim_object) {
    //console.log('fr' + from_value);
    anim_object.setValue(from_value);
    Animated.timing(
      anim_object,
      {
        toValue: to_y,
        duration: p_duration,
        easing: Easing.linear
      }
    ).start();
  }
  //    inputRange: [(box.center_y-game_component.standard.bottom/2), box.center_y, (box.center_y+game_component.standard.bottom/2)],
  inputRange(yh, y0, yd, val) {

    if (val < y0) res = 1 - (y0 - val) / (y0 - yd);
    if (val > y0) res = 1 - (val - y0) / (yh - y0);
    if (val === y0) res = 0;
    return res;
  }


  animate() {
    /*  
    Animated.spring(this.animatedValue, {
                  toValue: {x:100,y:550-70},   // Returns to the start
    friction: 40,
    restSpeedThreshold:520,
      //tension: 40,
    
                 // speed:200,
                  velocity:10,
                  //tension: 100, // Slow
                  //friction: 3,  // Oscillate a lot
                }).start();
      */
    /*
    this.animatedValue.setValue({x:100,y:0});
    Animated.timing(
      this.animatedValue,
      {
        toValue: {x:100,y:550-70},
        duration: 2000,
             
        easing: Easing.linear
      }
    ).start(() => this.animate());
    */
  }
  do_moving() {
    //game_component.my_main();


  }
  onPressSpaceIn() {
    this.firestrike(this.animatedFire);
  }

  onPressSpaceOut() {
  }

  renderAnimatedImageOpacity(obj, top, left, key) {
    //var o=animated_images[ind];
    return <AnimatedImageOpacity key={key} source={obj.source} top={top} left={left} height={obj.height} width={obj.width} />;
  }

  do_bombing(obj, shift_x, shift_y) {
    const bomb_distance = box.bomb_distance * (1 / flight.scaling);
    const bomb_time = bomb_distance / flight.bomb_speed;
    const bomb_scaling = flight.scaling > 0.3 ? flight.scaling : 0.3;
    const delay = shift_y * 10;
    //this.ground_move(0.9, bomb_scaling, bomb_time, this.animatedBomb);
    //this.ground_move((box.ground_max_y / 2) + 5, box.ground_max_y / 2 + bomb_distance + 5, bomb_time, this.animatedBombY);
    obj.animatedBomb.setValue(0.9);
    obj.animatedBombY.setValue((box.ground_max_y / 2) + 5 + shift_y);
    obj.animatedBombOpacity.setValue(0);
    obj.animatedBombBlastOpacity.setValue(0);
    obj.animatedBombX.setValue(box.center_x - this.cur_value_ground_moveX.value + shift_x);
    //blast
    Animated.parallel([
      Animated.sequence([
        Animated.timing(
          obj.animatedBomb,
          {
            toValue: bomb_scaling,
            duration: bomb_time,
            delay: delay,
            easing: Easing.linear
          }
        )
        , Animated.timing(
          obj.animatedBombOpacity,
          {
            toValue: 1,
            duration: 10,
            easing: Easing.linear
          }
        )
        , Animated.timing(
          obj.animatedBombBlastOpacity,
          {
            toValue: 1,
            duration: 10,
            easing: Easing.linear
          }
        )
      ])
      ,
      Animated.sequence([
        Animated.timing(
          obj.animatedBombY,
          {
            toValue: (box.ground_max_y / 2 + 2 * bomb_distance + 5 + shift_y),
            duration: 2 * bomb_time,
            delay: delay,
            easing: Easing.linear
          }
        )
        , Animated.timing(
          obj.animatedBombBlastOpacity,
          {
            toValue: 0,
            duration: 10,
            easing: Easing.linear
          }
        )
    ])
    ]
    ).start();


  }
  do_bombing2() {
    let a = -150;
    for (let i = 0; i < this.bombs.length; i++) {
      if (a < 150) a = a + 100;
      else a = 0;
      this.do_bombing(this.bombs[i], a, 35 * i);
    }
  }

  render_bombs(obj, key) {
    const BombOpacity = obj.animatedBombOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    })

    const BombBlastOpacity = obj.animatedBombBlastOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    })

    return (
      <Animated.View key={key} style={{ left: Animated.add(obj.animatedBombX, this.animatedGroundMoveX), top: obj.animatedBombY, height: 48, width: 48, position: 'absolute', transform: [{ scale: (Animated.multiply(obj.animatedBomb, this.animatedScalingCom), Animated.multiply(obj.animatedBomb, this.animatedScalingCom)) }] }}>
        <Animated.Image source={require('./images/path4208.png')} style={{ opacity: (BombOpacity), left: 18, top: 12, height: 24, width: 12, position: 'absolute' }} />
        <Animated.Image source={require('./images/vrag_vzriv.png')} style={{ borderRadius: 50, opacity: obj.animatedBombBlastOpacity, left: 0, top: 0, height: 30, width: 30, position: 'absolute' }} />
      </Animated.View>

      
    );

  }
  render() {

    const rotate = this.targetValue.interpolate({
      inputRange: [-game_component.standard.right, 0, game_component.standard.right],
      outputRange: ['-180deg', '0deg', '180deg']
    })

    const rotate2 = this.targetValue.interpolate({
      inputRange: [-game_component.standard.right, 0, game_component.standard.right],
      outputRange: ['-360deg', '0deg', '360deg']
    })
    /*
        const opacity = this.disapearValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        })
    */

    const scale = this.animatedScaling.interpolate({
      inputRange: [0.1, 1],
      outputRange: [80, 1]
    })

    const bomb_scale = this.animatedScaling.interpolate({
      inputRange: [0.1, 1],
      outputRange: [0.9, 0.1]
    })

    const firemove = this.animatedFire.interpolate({
      inputRange: [0, 100],
      outputRange: [(box.screen_height / 2 + 20), 0]

    })
    //    inputRange: [(box.center_y-box.screen_height/2), box.center_y, (box.center_y+box.screen_height/2)],
    //    inputRange: [5386, 5670, 5954],

    const movedelaykoef = this.animatedShipValue.y.interpolate({
      inputRange: [(box.center_y - game_component.standard.bottom / 2), box.center_y, (box.center_y + game_component.standard.bottom / 2)],
      outputRange: [-1, 0, -1]

    })

    const bombing_anim = this.bombs.map((item, index) => {
      return (this.render_bombs(item, index));
    });

    //inputRange: [5386, 5670, 5954],

    //const ccx= this.animatedGroundMove-100; 
    /*
    
    <Image  source={ require('./images/map.png') }
                  style={{                              
                    position: 'absolute',
                    height: 11341,
                    width: 778,
                    top:0, 
                    left:300,                                                                              
                  }} /> 
         
    
                top:this.animatedGroundMove,
    marginTop:this.animatedGroundMove, 
    transform:[{translateY:(this.animatedGroundMove)}],     
    left:this.animatedGroundMoveX,
    
              <Image source={this.state.src} style={{left:box.center_x-50,top:box.center_y+box.screen_height/4-50, width:778,height:11341, position:'absolute'}} />
    
            //,width:643,height:2166
            {allenemyobj} 
    
    */

    //this.setState({flight_height:this.cur_value_scaling});
    const allenemyobj = animated_images.map((item, index) => {
      return (this.renderAnimatedImageOpacity(item.obj, item.top, item.left, index))
    })




    //transform:[{rotate:(rotate2)}], 

    /*
    
    !!! compens 1 var
                top: Animated.add(this.animatedGroundMove, Animated.multiply(this.animatedGroundMove,movedelaykoef)),
    
    
    transform:[{rotate:'-90deg'}], 
                          for (var i=0;i<animated_images.length;i++) 
                            retarr=retarr + this.renderAnimatedImageOpacity(animated_images[i].obj,animated_images[i].top,animated_images[i].left)
                          return retarr;
    top:this.animatedShipValue.y,    
            <Image source={require('./images/map3.png')} style={{left:box.center_x-50,top:box.center_y+box.screen_height/4-50, width:643,height:836, position:'absolute'}} />        
            <Image source={require('./images/map3.png')} style={{left:box.center_x-50,top:box.center_y+box.screen_height/4-50+836, width:643,height:836, position:'absolute'}} />
    <Animated.Image source={require('./images/map4.png')} style={{left:box.center_x-50,top:0, width:700,height:10001, position:'absolute'}} />                              
    
    Animated.add(Animated.add(this.animatedGroundMove, Animated.multiply(this.animatedGroundMove,movedelaykoef)) ,this.animatedGroundMoveCompens )  ,
    
    */
    return (

      <Animated.View style={{
        position: 'absolute',
        left: 0,
        height: box.height,
        width: box.width,
        top: 0,
        backgroundColor: 'yellow',
      }}
      >

        <Animated.View {...this._panResponder.panHandlers} style={{
          transform: [{ rotate }],
          position: 'absolute',
          left: box.x0,
          height: box.height,
          width: box.width,
          top: box.y0,
          backgroundColor: 'yellow',
        }}
        >

          <Animated.View style={{
            transform: [{ scale: (this.animatedScaling, this.animatedScaling) }],
            backgroundColor: 'green',
            position: 'absolute',
            height: box.width,
            width: box.height,
            flex: 1,
            left: 0,
            top: 0,

          }} >
            <Animated.View style={{
              backgroundColor: 'rgb(45, 191, 40)',
              position: 'absolute',
              height: box.height,
              width: box.width,
              flex: 1,
              left: this.animatedGroundMoveX,
              top: this.animatedGroundMove,

            }} >
              {allenemyobj}

            </Animated.View>
{bombing_anim}

          </Animated.View>

          <Animated.View style={{

            backgroundColor: 'rgb(160, 229, 239)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: box.width,
            height: this.animatedShipValue.y,

            borderStyle: 'solid',
            borderWidth: 4,
            borderColor: 'red',
          }} >

          </Animated.View>

          <Animated.Image source={require('./images/pricel2.png')} style={{ left: box.center_x - 50, top: box.center_y - 50, height: 100, width: 100, position: 'absolute' }} />


        </Animated.View>


        <Animated.Text style={{ left: 100, top: 125, position: 'absolute', fontSize: 10, }}>
          1000m
                          </Animated.Text>

        <Animated.View style={{
          flex: 1,
          transform: [{ rotate: '180deg' }],
          left: 90, top: 130, height: 82, width: 7, position: 'absolute',
          borderColor: '#333',
          borderWidth: 1
        }}
        >

          <Animated.View style={{
            height: scale, width: 5,
            backgroundColor: 'yellow',
            position: 'absolute',
            left: 0, top: 0,
          }}
          />
        </Animated.View>

        <Animated.View style={{
          flex: 1,
          transform: [{ rotate: '30deg' }],
          left: (box.screen_width / 4), top: (box.screen_height - box.screen_height / 2 - 10), height: box.screen_height / 2, width: 7, position: 'absolute',
        }}
        >
          <Animated.View style={{
            height: 10, width: 5,
            backgroundColor: 'white',
            position: 'absolute',
            left: 0, top: firemove,
          }}
          />
        </Animated.View>

        <TouchableHighlight onPressIn={() => { this.firestrike(this.animatedFire); this.do_bombing2(); }} onPressOut={this.onPressSpaceOut} style={styles.container_space_button}>
          <Text style={{ position: 'absolute', top: 0, left: 0 }}>VVV</Text>
        </TouchableHighlight>

      </Animated.View>
    );
  }
}
/*

*/
const styles = StyleSheet.create({
  sampledim: {
    transform: [{ scale: 0.5 }],
    top: -95,
    left: 0,
    width: game_component.standard.right,
    height: game_component.standard.bottom - 25,
    borderWidth: 2,
    borderColor: 'red',
  },
  upperview: {
    backgroundColor: 'rgb(160, 229, 239)',
    position: 'absolute',
    top: 0,
    left: 0,
    height: box.height / 2,
    width: box.width,

  },

  bottomview: {
    backgroundColor: 'red',
    position: 'absolute',
    top: game_component.standard.bottom,
    left: 0,
    height: game_component.standard.bottom,
    width: (game_component.standard.bottom * 2),
    flex: 1,


  },

  image_automated: {
    position: 'absolute',
    bottom: 0,
  },
  container_space_button: {
    position: 'absolute',
    width: 100,
    height: 60,
    top: 0,
    left: 0,
  },
  container_right_button: {
    position: 'absolute',
    width: 50,
    bottom: 0,
    right: 0,
  },
  container_left_button: {
    position: 'absolute',
    width: 50,
    bottom: 0,
    right: 120,
  },
  container_botton: {
    flex: 1,
    flexDirection: 'column',
    width: 50,
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: 0,
    height: 80,
    right: 60,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(36,28,28)',
    width: box.width,
    height: box.height,
  },
  play_figure: { position: 'absolute' }
  ,
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);