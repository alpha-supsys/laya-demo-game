/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import BaseScene from "./BaseScene"
/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=1200;
    static height:number=800;
    static scaleMode:string="noscale";
    static screenMode:string="horizontal";
    static alignV:string="top";
    static alignH:string="left";
    static startScene:any="BaseScene.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=false;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("BaseScene.ts",BaseScene);
    }
}
GameConfig.init();