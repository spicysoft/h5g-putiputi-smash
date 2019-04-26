var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameScene = (function () {
    function GameScene() {
    }
    GameScene.create = function () {
        GameScene.circleNumber = 0;
        GameScene.catchCircle = 0;
        var specialGenerate = 100; //Util.randomInt(0,100);
        if (specialGenerate >= 65) {
            new Special(Mark.circleGeneratePos[0], Mark.circleGeneratePos[1], Mark.circleRadius, Mark.circleRadius, ColorPallet.BULE);
        }
        for (var i = 0; i < GameScene.stageLevel; i++) {
            var probability = Util.randomInt(0, 100);
            if (i == 0) {
                new Circle(Mark.circleGeneratePos[0], Mark.circleGeneratePos[1], Mark.circleRadius, Mark.circleRadius, ColorPallet.BLACK);
                GameScene.circleNumber += 1;
            }
            else if (i == 1) {
                new Cross(Mark.crossGeneratePos[0], Mark.crossGeneratePos[1], Mark.crossWidth, Mark.crossWidth, ColorPallet.BLACK);
            }
            else if (probability <= GameScene.circleRate) {
                new Circle(Mark.circleGeneratePos[0], Mark.circleGeneratePos[1], Mark.circleRadius, Mark.circleRadius, ColorPallet.BLACK);
                GameScene.circleNumber += 1;
            }
            else {
                var c = new Cross(Mark.crossGeneratePos[0], Mark.crossGeneratePos[1], Mark.crossWidth, Mark.crossWidth, ColorPallet.BLACK);
                if (Bonus.bonusFlag) {
                    c.changeShape(Mark.circleRadius, ColorPallet.BLACK, false, 6);
                }
            }
        }
    };
    GameScene.stageLevel = 10;
    GameScene.circleRate = 80;
    GameScene.circleNumber = 0; //生成したcircle数
    GameScene.catchCircle = 0; //捕まえたcircle数
    return GameScene;
}());
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map