// UnityのGameObjectライクなタスク管理クラス
//  update()に毎フレームの処理を書く
//  オブジェクトを破棄するときはdestroy()を呼ぶ
//  破棄のときに後処理が必要なら、onDestroy()に記述
//  生成時の初期化はUnityと違い、constructor()を使う（引数を渡せる）
//  シーンを切り替えたい場合は transitにシーンロード関数を設定（全オブジェクトを破棄してからtransitを実行）
//  compornentはshapeをひとまとめにする用の親コンテナ。継承先でsetCompornentすること
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameObject = (function () {
    function GameObject() {
        this.compornent = null;
        this.shapes = [];
        this.destroyFlag = false;
        GameObject.objects.push(this);
    }
    GameObject.init = function (mainStage) {
        GameObject.objects = [];
        GameObject.display = mainStage;
    };
    //オブジェクトを削除
    GameObject.prototype.destroy = function () { this.destroyFlag = true; };
    //shapeの削除など、destroy後に追加処理が必要なら記述
    GameObject.prototype.addDestroyMethod = function () { };
    GameObject.prototype.delete = function () {
        var _this = this;
        this.addDestroyMethod();
        if (this.shapes && this.compornent) {
            this.shapes.forEach(function (s) {
                _this.compornent.removeChild(s);
                s = null;
            });
            this.shapes = [];
        }
        if (this.compornent) {
            GameObject.display.removeChild(this.compornent);
            this.compornent = null;
        }
        /*        const newArray : GameObject[] = GameObject.objects.filter(obj => obj.destroyFlag !== true);
                GameObject.objects = newArray;*/
    };
    GameObject.allDestroy = function () {
        GameObject.objects = GameObject.objects.filter(function (obj) {
            obj.destroy();
            obj.delete();
            return false;
        });
    };
    //繰り返しメソッド
    GameObject.update = function () {
        GameObject.objects.forEach(function (obj) { return obj.updateContent(); });
        //destroyFlagがtrueならshapeを削除
        GameObject.objects = GameObject.objects.filter(function (obj) {
            if (obj.destroyFlag)
                obj.delete();
            return (!obj.destroyFlag);
        });
        if (GameObject.transit) {
            GameObject.allDestroy();
            GameObject.transit();
            GameObject.transit = null;
        }
    };
    GameObject.objects = [];
    return GameObject;
}());
__reflect(GameObject.prototype, "GameObject");
var PhysicsObject = (function (_super) {
    __extends(PhysicsObject, _super);
    function PhysicsObject() {
        var _this = _super.call(this) || this;
        _this.body = null;
        _this.bodyShape = null;
        return _this;
    }
    PhysicsObject.prototype.addDestroyMethod = function () {
        CreateWorld.world.removeBody(this.body);
    };
    PhysicsObject.world = null;
    return PhysicsObject;
}(GameObject));
__reflect(PhysicsObject.prototype, "PhysicsObject");
//GameStageに描画する用のコンポーネント
var GameCompornent = (function (_super) {
    __extends(GameCompornent, _super);
    function GameCompornent(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.setCompornent(x, y, width, height);
        return _this;
    }
    GameCompornent.prototype.setCompornent = function (x, y, width, height) {
        /*        if(width <= 0){
                    console.log("widthが0以下です :" + width);
                    width = 1;
                }
                if(height <= 0){
                    console.log("heightが0以下です :" + height);
                    height = 1;
                }*/
        this.compornent = new egret.DisplayObjectContainer();
        this.compornent.width = width;
        this.compornent.height = height;
        GameStage.display.addChild(this.compornent);
    };
    return GameCompornent;
}(GameObject));
__reflect(GameCompornent.prototype, "GameCompornent");
//UILayerに描画する用のコンポーネント
var UICompornent = (function (_super) {
    __extends(UICompornent, _super);
    function UICompornent(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.setCompornent(x, y, width, height);
        return _this;
    }
    UICompornent.prototype.setCompornent = function (x, y, width, height) {
        /*        if(width <= 0){
                    width = 1;
                    console.log("widthが0以下です");
                }
                if(height <= 0){
                    height = 1;
                    console.log("heightが0以下です");
                }*/
        this.compornent = new egret.DisplayObjectContainer();
        this.compornent.width = width;
        this.compornent.height = height;
        UILayer.display.addChild(this.compornent);
    };
    UICompornent.compornents = [];
    return UICompornent;
}(GameObject));
__reflect(UICompornent.prototype, "UICompornent");
//# sourceMappingURL=GameObject.js.map