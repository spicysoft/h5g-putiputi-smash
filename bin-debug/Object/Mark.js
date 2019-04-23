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
var Mark = (function (_super) {
    __extends(Mark, _super);
    function Mark(x, y, width, height, lineColor) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.isHit = false;
        _this.moveVector = [];
        _this.lineColor = lineColor;
        _this.length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        _this.setMoveVector(2, 45);
        return _this;
    }
    Mark.prototype.setCircleShape = function (x, y, radius) {
        var shape = new egret.Shape();
        /*        shape.x = x;
                shape.y = y;*/
        shape.graphics.lineStyle(6, this.lineColor);
        shape.graphics.drawCircle(0, 0, radius);
        this.compornent.addChild(shape);
        GameStage.display.addChild(this.compornent);
        this.shapes.push(shape);
    };
    Mark.prototype.setCrossShape = function (x, y, width, height, length, degree, lineWidth, lineColor) {
        var shape = Util.setLine(0, 0, length, degree, lineWidth, lineColor);
        this.compornent.addChild(shape);
        var shape2 = Util.setLine(0, 0 + height, length, 360 - degree, lineWidth, lineColor);
        this.compornent.addChild(shape2);
        GameStage.display.addChild(this.compornent);
        this.shapes.push(shape);
        this.shapes.push(shape2);
    };
    Mark.prototype.setMoveVector = function (size, degree) {
        this.moveVector = Util.vector(size, degree);
    };
    Mark.prototype.move = function () {
        this.compornent.x += this.moveVector[0];
        this.compornent.y += this.moveVector[1]; //Egret はy軸が下向き
    };
    //反射ベクトル = 入射べクトル - 法線ベクトル*2
    //https://thinkit.co.jp/article/8466
    Mark.prototype.reflect = function (wallVector) {
        if (this.isHit) {
            this.moveVector = Util.reflectionVector(this.moveVector, wallVector);
            this.isHit = false;
        }
    };
    Mark.prototype.checkHit = function () {
        for (var i = 0; i <= 3; i++) {
            if (Frame.I.shapes[i].hitTestPoint(this.compornent.x, this.compornent.y, true)) {
                this.isHit = Frame.I.shapes[i].hitTestPoint(this.compornent.x, this.compornent.y, true);
                this.reflect(Frame.I.vector[i]);
            }
        }
        /*        Frame.I.shapes.forEach(s =>{
                    if(s.hitTestPoint(this.compornent.x, this.compornent.y, true)){
                        this.isHit = s.hitTestPoint(this.compornent.x, this.compornent.y, true);
                    }
                });*/
        //this.isHit = Frame.I.shapes[2].hitTestPoint(this.compornent.x, this.compornent.y, true);
        //console.log(this.isHit);
    };
    Mark.prototype.updateContent = function () {
        this.move();
        this.checkHit();
    };
    Mark.moveSpeed = 1;
    return Mark;
}(GameCompornent));
__reflect(Mark.prototype, "Mark");
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, width, height, lineColor) {
        var _this = _super.call(this, x, y, width, height, lineColor) || this;
        _this.setCircleShape(x, y, width / 2);
        return _this;
    }
    return Circle;
}(Mark));
__reflect(Circle.prototype, "Circle");
var Cross = (function (_super) {
    __extends(Cross, _super);
    function Cross(x, y, width, height, lineColor) {
        var _this = _super.call(this, x, y, width, height, lineColor) || this;
        _this.setCrossShape(x, y, width, height, _this.length, 45, 6, lineColor);
        return _this;
    }
    return Cross;
}(Mark));
__reflect(Cross.prototype, "Cross");
//# sourceMappingURL=Mark.js.map