"use strict";
import{ Dimensions } from 'react-native';
class standard {
    constructor() {
        this.def_width = 0;
        this.def_height = 0;
        this.def_top = 0;
        this.def_left = 0;
        this.bottom = Dimensions.get('window').height-25; // document.body.offsetHeight;//659;        
        this.right = Dimensions.get('window').width; //document.body.offsetWidth;//1366;                                  
    }
}
exports.standard = standard;
//# sourceMappingURL=standard.js.map