(function () {
    'use strict';

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class BaseSceneUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("BaseScene");
            }
        }
        ui.BaseSceneUI = BaseSceneUI;
        REG("ui.BaseSceneUI", BaseSceneUI);
    })(ui || (ui = {}));

    class BaseScene extends ui.BaseSceneUI {
        constructor() {
            super();
            this.socket = new Laya.Socket();
            this.socket.on(Laya.Event.OPEN, this, this.onOpen);
            this.socket.on(Laya.Event.MESSAGE, this, this.onMsg);
            this.socket.on(Laya.Event.CLOSE, this, this.onClose);
            this.socket.on(Laya.Event.ERROR, this, this.onErr);
            this.socket.connectByUrl("wss://laya-demo-game-backend.alpha-supsys.com/api/beta/ws");
        }
        onOpen(e) {
        }
        onMsg(msg) {
            console.log(msg);
        }
        onClose(e) {
        }
        onErr(err) {
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("BaseScene.ts", BaseScene);
        }
    }
    GameConfig.width = 1200;
    GameConfig.height = 800;
    GameConfig.scaleMode = "noscale";
    GameConfig.screenMode = "horizontal";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "BaseScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
