import {ui} from "./ui/layaMaxUI";
// import Card from "./Card"
// import Player from "./Player"

export default class BaseScene extends ui.BaseSceneUI {
  private socket:Laya.Socket;
  // private players:Player[];
  private playerId:string;

  constructor() {
    super();

    // let card:Card = new Card(this);
    // console.log(card)
    

    // let spr: Laya.Sprite = new Laya.Sprite();
    // this.addChild(spr);
    // spr.graphics.drawRect(0,0,50,50,"#ffffff");

    this.socket = new Laya.Socket();
    this.socket.on(Laya.Event.OPEN, this, this.onOpen);
    this.socket.on(Laya.Event.MESSAGE, this, this.onMsg);
    this.socket.on(Laya.Event.CLOSE, this, this.onClose);
    this.socket.on(Laya.Event.ERROR, this, this.onErr);

    

    this.socket.connectByUrl("ws://laya-demo-game-backend.alpha-supsys.com/api/beta/ws");
  }

  private onOpen(e): void {

  }

  private onMsg(msg): void {
    console.log(msg)
  }

  private onClose(e): void {

  }

  private onErr(err): void {

  }
}