"use strict";
const play_figure_1 = require("./play_figure");
const play_man_1 = require("./play_man");
const game_service_1 = require("./game_service");
const player_keyset_1 = require("./player_keyset");
const standard_1 = require("./standard");
//import sampleModule = require('.././images/star.png');
class AppComponent {
    constructor() {
        //player_figure: play_man; 
        this.play_figures = [];
        this.values = ''; //Math.floor(34/8);
        this.game_status = 1;
        this.meteor_count = 40;
        this.one_time_meteor_add_count = 5;
        this.step_counter = 1;
        this.server_game = false;
        this.server_leader = false;
        this.server_marker = 'demo';
        this.input_form_visibility = 'visible';
        this.standard = new standard_1.standard();
        this.local_one_player = true;
        //bam_sound=new Audio('bam.wav');
        //bim_sound=new Audio('bim.wav');
        this.robot_init_marker = false;
        this.robot_laser_lifo = new Array(); 
        this.main_service = new game_service_1.game_service();
        this.player_figures = Array(new play_man_1.play_man());
        this.player_figures[0].man_play_figure = new play_figure_1.play_figure();
        this.player_figures[0].man_play_figure.coord_x = 20;
        this.player_figures[0].man_play_figure.coord_y = 20;
        this.player_figures[0].man_play_figure.play_type = 'player';
        this.player_figures[0].init_weapon_shift_top = 59;
        this.player_figures[0].init_gun();
        this.player_figures[0].man_play_figure.z_index = '100';
        this.player_figures[0].man_play_figure.movement_type = 'keyset';
        this.player_figures[0].man_play_figure.keyset = new player_keyset_1.player_keyset('left', 'right', 'up', 'down', 'space'); // new player_keyset(68,65,88,69,90);// 
        this.player_figures[0].gamepad = false;
        this.main_service.init_keymap(this.player_figures[0].man_play_figure.keyset);
        this.player_figures[0].server_send = false;
        //this.main_service.play_bg = new Audio('DX5.mp3');
        //this.main_service.play_bg.play();
        this.meteor_play_figures = new Array(this.player_figures[0].man_play_figure, new play_figure_1.play_figure());
        //, new play_figure_1.play_figure(), new play_figure_1.play_figure(), new play_figure_1.play_figure());
        /*
            this.meteor_play_figures[8].image_sources = [{ step_px: 5, width: 355, length: 55, event: 'move', source: 'landing.svg', live_iter: 75, iteration_count: 0 , active_heigth:null  },{ step_px: 5, width: 355, length: 55, event: 'move', source: 'landing2.svg', live_iter: 75, iteration_count: 0 , active_heigth:null  }];
            this.meteor_play_figures[8].coord_x = 0;
            this.meteor_play_figures[8].visibility = 'hidden';
            this.meteor_play_figures[8].set_position_bottom();
            this.meteor_play_figures[8].play_type = 'landing';
            this.meteor_play_figures[8].figure_outline = 'star';
            this.meteor_play_figures[8].score = 50;
            this.meteor_play_figures[8].wait_iterations = 1500;
            this.meteor_play_figures[8].dom_id = 'landing';
        
            this.meteor_play_figures[9].image_sources = [{ step_px: 5, width: 40, length: 40, event: 'move', source: 'planeta.svg', live_iter: 15, iteration_count: 0 , active_heigth:null  }];
            //,{width: 40, length: 40, event:'move' , source: 'star_white.svg', live_iter:5, iteration_count:0 }
            this.meteor_play_figures[9].coord_x = 700;
            this.meteor_play_figures[9].coord_y = 30;
            this.meteor_play_figures[9].play_type = 'flying_obj';
            this.meteor_play_figures[9].figure_outline = 'star';
        
            this.meteor_play_figures[11].image_sources = [{ step_px: 5, width: 40, length: 40, event: 'move', source: 'star_yellow.svg', live_iter: 15, iteration_count: 0 , active_heigth:null  }];
            //,{width: 40, length: 40, event:'move' , source: 'star_white.svg', live_iter:5, iteration_count:0 }
            this.meteor_play_figures[11].coord_x = 170;
            this.meteor_play_figures[11].coord_y = 160;
            this.meteor_play_figures[11].play_type = 'flying_obj';
            this.meteor_play_figures[11].figure_outline = 'star';
            this.meteor_play_figures[11].dom_id = 'star3';
        
            this.meteor_play_figures[12].image_sources = [{ step_px: 5, width: 40, length: 40, event: 'move', source: 'star_yellow.svg', live_iter: 15, iteration_count: 0 , active_heigth:null  }];
            //,{width: 40, length: 40, event:'move' , source: 'star_white.svg', live_iter:5, iteration_count:0 }
            this.meteor_play_figures[12].coord_x = 650;
            this.meteor_play_figures[12].coord_y = 70;
            this.meteor_play_figures[12].play_type = 'flying_obj';
            this.meteor_play_figures[12].figure_outline = 'star';
            this.meteor_play_figures[11].dom_id = 'star4';
        
            this.meteor_play_figures[13].image_sources = [{ step_px: 5, width: 40, length: 40, event: 'move', source: 'star_yellow.svg', live_iter: 15, iteration_count: 0 , active_heigth:null  }];
            //,{width: 40, length: 40, event:'move' , source: 'star_white.svg', live_iter:5, iteration_count:0 }
            this.meteor_play_figures[13].coord_x = 210;
            this.meteor_play_figures[13].coord_y = 130;
            this.meteor_play_figures[13].play_type = 'flying_obj';
            this.meteor_play_figures[13].figure_outline = 'star';
            this.meteor_play_figures[13].dom_id = 'star5';
        
            this.meteor_play_figures[15].image_sources = [{ step_px: 20, width: 35, length: 70, event: 'move', source: 'treug0.svg', live_iter: 15, iteration_count: 0 , active_heigth:null  }, { step_px: 20, width: 35, length: 150, event: 'move', source: 'treug.svg', live_iter: 5, iteration_count: 0 , active_heigth:null  }
            , { step_px: 0, width: 60, length: 35, event: 'disappear', source: 'vrag_vzriv.svg', live_iter: 2, iteration_count: 0 , active_heigth:null  }
            ];
            //,{width: 40, length: 40, event:'move' , source: 'star_white.svg', live_iter:5, iteration_count:0 }
            this.meteor_play_figures[15].coord_x = 1150;
            this.meteor_play_figures[15].coord_y = 10;
            this.meteor_play_figures[15].play_type = 'flying_obj';
            this.meteor_play_figures[15].figure_outline = 'star';
            this.meteor_play_figures[15].play_type = 'end';
            this.meteor_play_figures[15].dom_id = 'treug0';
        
            this.meteor_play_figures[17].image_sources = [{ step_px: 18, width: 70, length: 70, event: 'move', source: 'bomba.svg', live_iter: 15, iteration_count: 0 , active_heigth:null  }];
            //,{width: 40, length: 40, event:'move' , source: 'star_white.svg', live_iter:5, iteration_count:0 }
            this.meteor_play_figures[17].coord_x = 1020;
            this.meteor_play_figures[17].coord_y = 400;
            this.meteor_play_figures[17].play_type = 'flying_obj';
            this.meteor_play_figures[17].figure_outline = 'star';
            this.meteor_play_figures[17].play_type = 'bomb';
            this.meteor_play_figures[17].score = 300;
            this.meteor_play_figures[17].movement_type = 'sinus';
            this.meteor_play_figures[17].dom_id = 'bomba';
        
            this.meteor_play_figures[18].image_sources = [{ step_px: 20, width: 70, length: 70, event: 'move', source: 'laser_large.svg', live_iter: 15, iteration_count: 0 , active_heigth:null  }];
            //,{width: 40, length: 40, event:'move' , source: 'star_white.svg', live_iter:5, iteration_count:0 }
            this.meteor_play_figures[18].set_position_right();
            //this.meteor_play_figures[18].coord_y ;
            this.meteor_play_figures[18].play_type = 'flying_obj';
            this.meteor_play_figures[18].figure_outline = 'star';
            this.meteor_play_figures[18].play_type = 'laser_large';
            this.meteor_play_figures[18].score = 300;
            this.meteor_play_figures[18].movement_type = 'cosinus';
            this.meteor_play_figures[18].dom_id = 'laser_large';
        
            this.meteor_play_figures[19].image_sources = [{ step_px: 20, width: 87, length: 33, event: 'move', source: 'dvagalaza.svg', live_iter: 25, iteration_count: 0 , active_heigth:null  }, { step_px: 20, width: 87, length: 73, event: 'move', source: 'dvagalaza2.svg', live_iter: 15, iteration_count: 0 , active_heigth:null  }, { step_px: 0, width: 60, length: 35, event: 'disappear', source: 'vrag_vzriv.svg', live_iter: 3, iteration_count: 0 , active_heigth:null  }];
            //,{width: 40, length: 40, event:'move' , source: 'star_white.svg', live_iter:5, iteration_count:0 }
            this.meteor_play_figures[19].coord_x = 870;
            this.meteor_play_figures[19].coord_y = 450;
            this.meteor_play_figures[19].play_type = 'end';
            this.meteor_play_figures[19].figure_outline = 'star';
            this.meteor_play_figures[19].movement_type = 'sinus';
            this.meteor_play_figures[19].wait_iterations = 150;
            this.meteor_play_figures[19].dom_id = 'dvaglaza';
        
            this.meteor_play_figures[20].image_sources = [{ step_px: 25, width: 60, length: 35, event: 'move', source: 'inik.svg', live_iter: 25, iteration_count: 0 , active_heigth:null  }, { step_px: 25, width: 60, length: 35, event: 'move', source: 'inik2.svg', live_iter: 15, iteration_count: 0 , active_heigth:null  }, { step_px: 0, width: 60, length: 35, event: 'disappear', source: 'vrag_vzriv.svg', live_iter: 2, iteration_count: 0 , active_heigth:null  }];
            //,{width: 40, length: 40, event:'move' , source: 'star_white.svg', live_iter:5, iteration_count:0 }
            this.meteor_play_figures[20].coord_x = 1000;
            this.meteor_play_figures[20].coord_y = 250;
            this.meteor_play_figures[20].play_type = 'end';
            this.meteor_play_figures[20].figure_outline = 'star';
            this.meteor_play_figures[20].movement_type = 'parabola';
            this.meteor_play_figures[20].dom_id = 'alien3';
        
        
            //console.log('acc:'+this.meteor_play_figures.length);
          */
        if (this.local_one_player) {
            this.server_game = false;
            this.generate_figure_ind();
            this.input_form_visibility = 'hidden';
        }
        //console.log('w:'+this.standard.right+';h:'+this.standard.bottom);
    }
    robot_laser_pli() {
        var ind;
        let p_ind = 0;
        let koef = 1;
        if (this.robot_laser_lifo.length > 0 && this.meteor_play_figures[27].play_type != 'end' && this.meteor_play_figures[27].status == 'move') {
            ind = this.robot_laser_lifo.pop();
            this.meteor_play_figures[ind].coord_x = this.meteor_play_figures[27].coord_x + 80;
            this.meteor_play_figures[ind].coord_y = this.meteor_play_figures[27].coord_y + 133;
            if (this.server_game && Math.floor(ind / 2) == ind / 2)
                p_ind = 0;
            if (this.server_game && Math.floor(ind / 2) != ind / 2)
                p_ind = 1;
            let w = Math.abs(this.player_figures[p_ind].man_play_figure.coord_x - this.meteor_play_figures[ind].coord_x);
            let h = this.meteor_play_figures[ind].coord_y - this.player_figures[p_ind].man_play_figure.coord_y;
            if (h != 0)
                koef = h / w;
            this.meteor_play_figures[ind].move_obj_current = { 'koef': koef, 'x0': this.meteor_play_figures[ind].coord_x, 'y0': this.meteor_play_figures[ind].coord_y };
            this.meteor_play_figures[ind].on_move_object = (figure) => {
                figure.coord_x = figure.coord_x - figure.image_sources[figure.current_source_index].step_px;
                figure.coord_y = figure.move_obj_current.y0 - (figure.move_obj_current.koef) * (figure.move_obj_current.x0 - figure.coord_x);
                //console.log(figure.ind+'; koef:' + this.meteor_play_figures[ind].move_obj_current.koef + ';x0:' + this.meteor_play_figures[ind].move_obj_current.x0 + ';x:' + figure.coord_x + ';y:' + figure.coord_y );      
            };
            this.meteor_play_figures[ind].object_continue_move();
        }
    }
    robot_init() {
        let figures_arr = new Array(28, 29, 30, 31, 32);
        let lwidth = 23;
        this.meteor_play_figures[27].stop_moving();
        //this.meteor_play_figures[33].coord_x = this.meteor_play_figures[27].coord_x;
        this.meteor_play_figures[33].stop_moving();
        for (let i = 0; i < figures_arr.length; i++) {
            this.robot_laser_lifo.push(figures_arr[i]);
        }
    }
    newGame() {
        //console.log(this.server_marker);
        if (this.server_marker != '') {
            this.server_player_ind = this.input_form_num_plyer;
            this.server_game = true;
            if (this.server_player_ind == 0) {
                this.server_leader = true;
            }
            else
                this.server_leader = false;
            //new player_keyset(68,65,88,69,90);// new player_keyset(39, 37, 40, 38, 32);
            this.player_figures[this.server_player_ind].man_play_figure.keyset = new player_keyset_1.player_keyset(39, 37, 40, 38, 32);
            for (let i = 0; i < this.player_figures.length; i++) {
                if (i != this.server_player_ind)
                    this.player_figures[i].man_play_figure.keyset = new player_keyset_1.player_keyset(68, 65, 88, 69, 90);
            }
        }
        else
            this.server_game = false;
        this.input_form_visibility = 'hidden';
        this.generate_figure_ind();
    }
    ispoint_cross_figure(coord_x, coord_y, pWidth, pLength, pAx, pAy) {
        if (coord_x <= pAx && (coord_x + pWidth) >= pAx && coord_y <= pAy && (coord_y + pLength) >= pAy)
            return true;
        //if (type=='shot' && coord_x <= pAx && (coord_x + pWidth) >= pAx && coord_y >= pAy && (coord_y + pLength) >= pAy) return true;
        return false;
    }
    ispoint_cross_figure_shot(coord_x, coord_y, pWidth, pALength, pAx, pAy) {
        //if (coord_x <= pAx && (coord_x + pWidth) >= pAx && coord_y <= pAy && (coord_y + pLength) >= pAy) return true;
        // this.values+='s:' + coord_x + '-' + pAx + '-' + (coord_x + pWidth) + '|'; 
        if (coord_x <= pAx && (coord_x + pWidth) >= pAx && coord_y >= pAy && (pAy + pALength) >= coord_y)
            return true;
        // 
        return false;
    }
    hide_object(figure) {
        figure.hide_object();
    }
    process_output_figure(figure, type, player_figure) {
        //let player_figure: play_man;
        // for (let i = 0; i < this.player_figures.length; i++) {
        //player_figure = this.player_figures[i];
        if (figure.play_type == 'laser_large' && figure.visibility == 'visible' && type == 'player') {
            player_figure.weapon_img = 'laser_large_shot.svg';
            player_figure.weapon_width = 450;
            player_figure.weapon_length = 9;
            player_figure.weapon_gan_bullets = player_figure.weapon_gan_bullets + 50;
            //figure.hide_object();
            this.hide_object(figure);
        }
        if (figure.play_type == 'end' && figure.visibility == 'visible' && type == 'shot' && player_figure.weapon_visibility == 'visible') {
            //figure.hide_object();
            this.hide_object(figure);
            //this.bam_sound.play();
            if (!this.server_game || (this.server_game && this.server_leader))
                player_figure.add_scores(figure.score);
        }
        if (figure.play_type == 'bomb' && figure.visibility == 'visible' && type == 'player') {
            if (!this.server_game || (this.server_game && this.server_leader))
                player_figure.add_scores(figure.score);
            this.clear_dangerous_obj();
            //figure.hide_object();
            this.hide_object(figure);
        }
        if (figure.play_type == 'live' && figure.visibility == 'visible' && type == 'player') {
            //figure.hide_object();
            this.hide_object(figure);
            if (!this.server_game || (this.server_game && this.server_leader)) {
                player_figure.add_scores(figure.score);
                player_figure.add_live_count(1);
            }
        }
        if (figure.play_type == 'landing' && figure.visibility == 'visible' && type == 'player') {
            this.main_service.game_state = 'win';
        }
        //this.main_service.game_state
        if (figure.play_type == 'prize' && figure.visibility == 'visible' && type == 'player')
            this.hide_object(figure); //figure.visibility = 'hidden';
        if ((figure.play_type == 'end' || figure.play_type == 'dyn') && figure.status == 'move' && type == 'player') {
            if (!this.server_game || (this.server_game && this.server_leader))
                player_figure.add_live_count(-1);
            //this.bim_sound.play();
            if (player_figure.live_count <= 0) {
                this.main_service.game_state = 'finish';
                //this.main_service.play_bg.pause();
            }
            this.hide_object(figure);
        }
        // }//end for 
    }
    canmove(pLeft, pTop, pWidth, pLength) {
        let element;
        for (var x = 1; x < this.meteor_play_figures.length; x++) {
            element = this.meteor_play_figures[x];
            //if (pLeft>900) this.values=element.play_type; 
            if (element.play_type == 'barrier' && this.ispoint_cross_figure(element.coord_x, element.coord_y, element.image_sources[element.current_source_index].width, element.image_sources[element.current_source_index].length, pLeft, pTop))
                return false;
            if (element.play_type == 'barrier' && this.ispoint_cross_figure(element.coord_x, element.coord_y, element.image_sources[element.current_source_index].width, element.image_sources[element.current_source_index].length, pLeft + pWidth, pTop))
                return false;
            if (element.play_type == 'barrier' && this.ispoint_cross_figure(element.coord_x, element.coord_y, element.image_sources[element.current_source_index].width, element.image_sources[element.current_source_index].length, pLeft, pTop + pLength))
                return false;
            if (element.play_type == 'barrier' && this.ispoint_cross_figure(element.coord_x, element.coord_y, element.image_sources[element.current_source_index].width, element.image_sources[element.current_source_index].length, pLeft + pWidth, pTop + pLength))
                return false;
            if (element.play_type == 'barrier' && this.ispoint_cross_figure(pLeft, pTop, pWidth, pLength, element.coord_x, element.coord_y))
                return false;
            if (element.play_type == 'barrier' && this.ispoint_cross_figure(pLeft, pTop, pWidth, pLength, element.coord_x + element.image_sources[element.current_source_index].width, element.coord_y))
                return false;
            if (element.play_type == 'barrier' && this.ispoint_cross_figure(pLeft, pTop, pWidth, pLength, element.coord_x, element.coord_y + element.image_sources[element.current_source_index].length))
                return false;
            if (element.play_type == 'barrier' && this.ispoint_cross_figure(pLeft, pTop, pWidth, pLength, element.coord_x + element.image_sources[element.current_source_index].width, element.coord_y + element.image_sources[element.current_source_index].length))
                return false;
        }
        return true;
    }
    //pLeft: number, pTop: number, pWidth: number, pLength: number, type: string,
    ispoint_cross_figure_v2(a1, a2, b1, b2) {
        if (((a1 <= b1) && (a2 >= b1)) || ((a1 <= b2) && (a2 >= b2)))
            return true;
        return false;
    }
    check_figures_v2(f1_x1, f1_width, f2_x1, f2_width, f1_y1, f1_height, f2_y1, f2_height) {
        let x_match = false;
        let y_match = false;
        let f1_x2 = f1_x1 + f1_width;
        let f2_x2 = f2_x1 + f2_width;
        let f1_y2 = f1_y1 + f1_height;
        let f2_y2 = f2_y1 + f2_height;
        if (f1_width > f2_width)
            x_match = this.ispoint_cross_figure_v2(f1_x1, f1_x2, f2_x1, f2_x2);
        else
            x_match = this.ispoint_cross_figure_v2(f2_x1, f2_x2, f1_x1, f1_x2);
        if (f1_height > f2_height)
            y_match = this.ispoint_cross_figure_v2(f1_y1, f1_y2, f2_y1, f2_y2);
        else
            y_match = this.ispoint_cross_figure_v2(f2_y1, f2_y2, f1_y1, f1_y2);
        return x_match && y_match;
    }
    check_figures(pLeft, pTop, pWidth, pLength, type, player_figure) {
        let ret_value = '';
        if (player_figure.man_play_figure.visibility == 'hidden')
            return;
        this.meteor_play_figures.forEach(element => {
            ret_value = '0';
            if (element.play_type != 'player' && type != 'shot') {
                if (this.check_figures_v2(pLeft, pWidth, element.coord_x, element.image_sources[element.current_source_index].width, pTop, pLength, element.coord_y, element.image_sources[element.current_source_index].length))
                    this.process_output_figure(element, type, player_figure);
            }
            if (element.play_type != 'player' && type == 'shot' && element.play_type == 'end') {
                //if (element.figure_outline!=='dyn' && this.ispoint_cross_figure_shot(pLeft, pTop, pWidth, element.image_sources[element.current_source_index].length, element.coord_x, element.coord_y)) this.process_output_figure(element, type,player_figure);
                if (element.figure_outline !== 'dyn' && this.check_figures_v2(pLeft, pWidth, element.coord_x, element.image_sources[element.current_source_index].width, pTop, pLength, element.coord_y, element.image_sources[element.current_source_index].length))
                    this.process_output_figure(element, type, player_figure);
                if (element.figure_outline == 'dyn') {
                    let ah = element.image_sources[element.current_source_index].active_heigth;
                    if (ah != null && ah > 0) {
                        if (this.check_figures_v2(pLeft, pWidth, element.coord_x, element.image_sources[element.current_source_index].width, pTop, pLength, element.coord_y, ah))
                            this.process_output_figure(element, type, player_figure);
                    }
                    else if (this.check_figures_v2(pLeft, pWidth, element.coord_x, element.image_sources[element.current_source_index].width, pTop, pLength, element.coord_y, element.image_sources[element.current_source_index].length))
                        this.process_output_figure(element, type, player_figure);
                }
            }
        });
    }
    // without strong typing
    onkeydown(event) {
        //this.values += event.key + '-' + event.keyCode ;
        if (this.main_service.game_state != 'run')
            return;
        this.main_service.fill_keymap(event);
        /*
            let vTop: number = this.player_figure.man_play_figure.coord_y;
            let vLeft: number = this.player_figure.man_play_figure.coord_x;
        */
    }
    gun_fire() {
        this.player_figures.forEach(player_figure => {
            this.check_figures(player_figure.weapon_coord_x, player_figure.weapon_coord_y, player_figure.weapon_width, player_figure.weapon_length, 'shot', player_figure);
        });
    }
    my_main() {
        this.move_active_objects(this.step_counter, 3);
        this.step_counter++;
    }
    add_objects(type, cnt_obj) {
    }
    move_active_objects(counter, iter_count) {
        let image_src;
        if (this.main_service.game_state == 'run') {
            for (let i = 0; i < this.player_figures.length; i++) {
                if (this.player_figures[i].gamepad == true)
                    this.main_service.fill_keymap_gamepad();
                this.player_figures[i].move_object(this.main_service.current_keymap); //this.meteor_play_figures[i].coord_x=this.meteor_play_figures[i].coord_x-image_src.step_px;
                this.player_figures[i].show_blow();
                this.player_figures[i].check_hide_blow(-1);
            }
            if (!this.server_game)
                this.gun_fire();
            /* server game block  */
            if (!this.server_leader && this.server_game) {
                this.gun_fire();
            }
            if (this.server_leader && this.server_game)
                this.gun_fire();
            /* end server game block */
            for (let i = 0; i < this.meteor_play_figures.length; i++) {
                image_src = this.meteor_play_figures[i].image_sources[this.meteor_play_figures[i].current_source_index];
                if (Math.floor(counter / iter_count) == counter / iter_count) {
                    if (this.meteor_play_figures[i].play_type != 'player' && this.meteor_play_figures[i].visibility == "visible") {
                        if (!this.server_game || (this.server_game && this.server_leader))
                            this.meteor_play_figures[i].move_object(this.main_service.current_keymap, 0); //this.meteor_play_figures[i].coord_x=this.meteor_play_figures[i].coord_x-image_src.step_px;
                    }
                }
                this.meteor_play_figures[i].iteration_count++;
                if (image_src.iteration_count > image_src.live_iter && (!this.server_game || (this.server_game && this.server_leader))) {
                    this.meteor_play_figures[i].change_next_image();
                }
                this.meteor_play_figures[i].image_sources[this.meteor_play_figures[i].current_source_index].iteration_count++;
                for (let i = 0; i < this.player_figures.length; i++)
                    this.check_figures(this.player_figures[i].man_play_figure.coord_x, this.player_figures[i].man_play_figure.coord_y, 210, 70, 'player', this.player_figures[i]);
                if ((this.meteor_play_figures[i].coord_y + this.meteor_play_figures[i].image_sources[this.meteor_play_figures[i].current_source_index].length) >= this.standard.bottom && this.meteor_play_figures[i].play_type != 'player' && this.meteor_play_figures[i].visibility == "visible" && (!this.server_game || (this.server_game && this.server_leader))) {
                    this.meteor_play_figures[i].set_hidden_prop();
                }
                if (this.meteor_play_figures[i].play_type != 'player' && this.meteor_play_figures[i].visibility == "hidden" && this.meteor_play_figures[i].status != "notactual" && (!this.server_game || (this.server_game && this.server_leader)))
                    this.meteor_play_figures[i].repeat_object();
            } //end for   
        }
    }
    clear_dangerous_obj() {
        for (var i = 0; i < this.meteor_play_figures.length; i++) {
            if (this.meteor_play_figures[i].visibility == 'visible' && this.meteor_play_figures[i].play_type == 'end' && this.meteor_play_figures[i].figure_outline != 'dyn') {
                this.meteor_play_figures[i].destroy_object();
            }
        }
    }
    generate_figure_ind() {
        for (let i = 0; i < this.meteor_play_figures.length; i++) {
            this.meteor_play_figures[i].ind = i;
        }
    }
} // end class
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map