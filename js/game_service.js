"use strict";
const key_pressed_1 = require("./key_pressed");
class game_service {
    //server_return:{};  
    constructor() {
        this.game_state = 'run';
        this.play_end = 'ma2-2.wav';
        this.current_keymap = [];
    }
    init_standart_y(fromn, to) {
        //zero_y_arr:= 
        //Math.rand
    }
    provide_figure_y() {
    }
    fill_keymap(e) {
        for (let i = 0; i < this.current_keymap.length; i++) {
            if (this.current_keymap[i].keyCode == e.keyCode && e.type == 'keydown')
                this.current_keymap[i].pressed = true;
            if (this.current_keymap[i].keyCode == e.keyCode && e.type == 'keyup')
                this.current_keymap[i].pressed = false;
        }
    }
    fill_keymap_gamepad() {
        var gp = navigator.getGamepads()[0];
        //var axeLF = gp.axes[0];
        //console.log('l'+gp.axes[1]);
        if (gp.buttons[1].pressed) {
            this.current_keymap[0].pressed = true;
            this.current_keymap[1].pressed = false;
        }
        else if (gp.buttons[2].pressed) {
            this.current_keymap[0].pressed = false;
            this.current_keymap[1].pressed = true;
        }
        else {
            this.current_keymap[0].pressed = false;
            this.current_keymap[1].pressed = false;
        }
        if (gp.buttons[0].pressed) {
            this.current_keymap[2].pressed = true;
            this.current_keymap[3].pressed = false;
        }
        else if (gp.buttons[3].pressed) {
            this.current_keymap[2].pressed = false;
            this.current_keymap[3].pressed = true;
        }
        else {
            this.current_keymap[2].pressed = false;
            this.current_keymap[3].pressed = false;
        }
    }
    init_keymap(player_keyset) {
        this.current_keymap.push(new key_pressed_1.key_pressed(player_keyset.left, false));
        this.current_keymap.push(new key_pressed_1.key_pressed(player_keyset.right, false));
        this.current_keymap.push(new key_pressed_1.key_pressed(player_keyset.up, false));
        this.current_keymap.push(new key_pressed_1.key_pressed(player_keyset.down, false));
        this.current_keymap.push(new key_pressed_1.key_pressed(player_keyset.fire, false));
    }
clear_keymap() {
        for (let i = 0; i < this.current_keymap.length; i++) {
                this.current_keymap[i].pressed = false;
        }
    }
check_point_match(x0,dx,y0,dy,pointX,pointY){
    console.log(x0+','+dx+','+y0+','+dy+','+pointX+','+pointY);
    if (x0<=pointX && (x0+dx)>=pointX && y0>=pointY && (y0-dy)<=pointY) return true;
    else return false; 
}        
}
exports.game_service = game_service;
//# sourceMappingURL=game_service.js.map