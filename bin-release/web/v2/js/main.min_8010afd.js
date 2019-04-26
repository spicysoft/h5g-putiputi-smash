var __reflect=this&&this.__reflect||function(e,t,o){e.__class__=t,o?o.push(t):o=[t],e.__types__=e.__types__?o.concat(e.__types__):o},__extends=this&&this.__extends||function(e,t){function o(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);o.prototype=t.prototype,e.prototype=new o},GameObject=function(){function e(){this.compornent=null,this.shapes=[],this.destroyFlag=!1,e.objects.push(this)}return e.init=function(t){e.objects=[],e.display=t},e.prototype.destroy=function(){this.destroyFlag=!0},e.prototype.addDestroyMethod=function(){},e.prototype["delete"]=function(){var t=this;this.addDestroyMethod(),this.shapes&&this.compornent&&(this.shapes.forEach(function(e){t.compornent.removeChild(e),e=null}),this.shapes=[]),Util.remove(e.display,this.compornent);var o=e.objects.filter(function(e){return e.destroyFlag!==!0});e.objects=o},e.allDestroy=function(){e.objects=e.objects.filter(function(e){return e.destroy(),e["delete"](),!1})},e.update=function(){e.objects.forEach(function(e){return e.updateContent()}),e.objects=e.objects.filter(function(e){return e.destroyFlag&&e["delete"](),!e.destroyFlag}),e.transit&&(e.allDestroy(),e.transit(),e.transit=null)},e.objects=[],e}();__reflect(GameObject.prototype,"GameObject");var PhysicsObject=function(e){function t(){var t=e.call(this)||this;return t.body=null,t.bodyShape=null,t}return __extends(t,e),t.prototype.addDestroyMethod=function(){CreateWorld.world.removeBody(this.body)},t.world=null,t}(GameObject);__reflect(PhysicsObject.prototype,"PhysicsObject");var GameCompornent=function(e){function t(t,o,r,n){var i=e.call(this)||this;return i.setCompornent(t,o,r,n),i}return __extends(t,e),t.prototype.setCompornent=function(e,t,o,r){this.compornent=new egret.DisplayObjectContainer,this.compornent.x=e,this.compornent.y=t,this.compornent.width=o,this.compornent.height=r,GameStage.display.addChild(this.compornent)},t.prototype["delete"]=function(){var e=this;this.addDestroyMethod(),this.shapes&&this.compornent&&(this.shapes.forEach(function(t){e.compornent.removeChild(t),t=null}),this.shapes=[]),this.compornent&&Util.remove(GameStage.display,this.compornent);var t=GameObject.objects.filter(function(e){return e.destroyFlag!==!0});GameObject.objects=t},t}(GameObject);__reflect(GameCompornent.prototype,"GameCompornent");var UICompornent=function(e){function t(t,o,r,n){var i=e.call(this)||this;return i.setCompornent(t,o,r,n),i}return __extends(t,e),t.prototype.setCompornent=function(e,t,o,r){this.compornent=new egret.DisplayObjectContainer,this.compornent.x=e,this.compornent.y=t,this.compornent.width=o,this.compornent.height=r,UILayer.display.addChild(this.compornent)},t.prototype["delete"]=function(){var e=this;this.addDestroyMethod(),this.shapes&&this.compornent&&(this.shapes.forEach(function(t){e.compornent.removeChild(t),t=null}),this.shapes=[]),this.compornent&&Util.remove(UILayer.display,this.compornent);var t=GameObject.objects.filter(function(e){return e.destroyFlag!==!0});GameObject.objects=t},t.compornents=[],t}(GameObject);__reflect(UICompornent.prototype,"UICompornent");var MyTween=function(){function e(){}return e.bonusFlash=function(e,t,o){var r=0;egret.Tween.get(e,{loop:!0}).to({alpha:.1},1e3/t,egret.Ease.quartIn).to({alpha:1},1e3/t,egret.Ease.quartOut).call(function(){r+=1,r==t&&(o.reverseShape(Mark.crossGeneratePos[0],Mark.crossGeneratePos[1],Mark.crossWidth,Mark.crossWidth,o.length,45,6,o.lineColor),egret.Tween.removeTweens(e),Bonus.bonusFlag=!1)})},e}();__reflect(MyTween.prototype,"MyTween");var Bonus=function(e){function t(o,r,n,i){var a=e.call(this,o,r,n,i)||this;return a.count=0,t.I=a,a.count=0,t.bonusFlag=!0,t.timer=new egret.Timer(1e3,0),t.timer.addEventListener(egret.TimerEvent.TIMER,a.timeMethod,a),t.timer.start(),a}return __extends(t,e),t.prototype.timeMethod=function(){this.count+=1,4==this.count&&this.stopMethod()},t.prototype.stopMethod=function(){t.timer.stop(),t.timer.removeEventListener(egret.TimerEvent.TIMER,this.timeMethod,this),t.bonusFlag&&Mark.mark.forEach(function(e){e.circle||MyTween.bonusFlash(e.compornent,20,e)}),this.count=0,this.destroy()},t.prototype.stopBonus=function(){t.bonusFlag&&!GameOver.gameOverFlag&&(t.timer.stop(),t.timer.removeEventListener(egret.TimerEvent.TIMER,this.timeMethod,this),Mark.mark.forEach(function(e){e.circle||(e.reverseShape(Mark.crossGeneratePos[0],Mark.crossGeneratePos[1],Mark.crossWidth,Mark.crossWidth,e.length,45,6,ColorPallet.BLACK),egret.Tween.removeTweens(e.compornent),t.bonusFlag=!1)}))},t.prototype.addDestroyMethod=function(){t.timer.stop(),t.timer.removeEventListener(egret.TimerEvent.TIMER,this.timeMethod,this),t.bonusFlag=!1},t.prototype.updateContent=function(){},t.I=null,t.bonusFlag=!1,t}(UICompornent);__reflect(Bonus.prototype,"Bonus");var ColorPallet;!function(e){e[e.BULE=4577789]="BULE",e[e.WHITE=16053492]="WHITE",e[e.RED=15607136]="RED",e[e.BLACK=530475]="BLACK"}(ColorPallet||(ColorPallet={}));var Main=function(e){function t(){var t=e.call(this)||this;return t.once(egret.Event.ADDED_TO_STAGE,t.addToStage,t),t}return __extends(t,e),t.prototype.addToStage=function(){SaveData.load(),GameObject.init(this.stage),Util.init(this),Game.init(),egret.startTick(this.tickLoop,this)},t.prototype.tickLoop=function(e){return GameObject.update(),!1},t}(eui.UILayer);__reflect(Main.prototype,"Main");var Game=function(){function e(){}return e.init=function(){this.height=egret.MainContext.instance.stage.stageHeight,this.width=egret.MainContext.instance.stage.stageWidth,Mark.circleGeneratePos=[e.width/1.5,e.height/2],Mark.crossGeneratePos=[e.width/3,e.height/2],Mark.circleRadius=e.width/20,Mark.crossWidth=e.width/26,GameOver.gameOverFlag=!1,GameScene.stageLevel=1,new GameStage,new UILayer,new Background,new Level(0,0,0,0,ColorPallet.BLACK),new Frame(e.width/12,e.height/9.5,e.width/1.2,e.height/1.2,ColorPallet.BLACK),GameScene.create(),new PushMark(0,0,e.width,e.width,ColorPallet.BLACK)},e}();__reflect(Game.prototype,"Game");var Background=function(e){function t(){var o=e.call(this,0,0,Game.width,Game.height)||this;return o.color=ColorPallet.WHITE,t.I=o,o.shapes[0]=new egret.Shape,o.shapes[0].graphics.beginFill(o.color),o.shapes[0].graphics.drawRect(0,0,Game.width,Game.height),o.shapes[0].graphics.endFill(),o.compornent.addChild(o.shapes[0]),o}return __extends(t,e),t.prototype.updateContent=function(){},t.I=null,t}(GameCompornent);__reflect(Background.prototype,"Background");var CreateWorld=function(e){function t(){var o=e.call(this)||this;return t.I=o,t.world.on("beginContact",o.collision,o),o}return __extends(t,e),t.prototype.createWorld=function(){t.world=new p2.World,t.world.sleepMode=p2.World.BODY_SLEEPING,t.world.gravity=[0,9.8]},t.worldBegin=function(e){return t.world.step(1/60,e/1e3,10),!1},t.prototype.collision=function(e){},t.prototype.addDestroyMethod=function(){t.world.clear()},t.prototype.updateContent=function(){},t.I=null,t}(PhysicsObject);__reflect(CreateWorld.prototype,"CreateWorld");var Mark=function(e){function t(o,r,n,i,a){var s=e.call(this,o,r,n,i)||this;return s.isHit=!1,s.moveVector=[],s.circle=!1,s.special=!1,s.lineColor=a,s.length=Math.sqrt(Math.pow(n,2)+Math.pow(i,2)),s.setMoveVector(t.moveSpeed,Util.randomInt(0,359)),t.mark.push(s),s}return __extends(t,e),t.prototype.setCircleShape=function(e,t,o,r,n,i){var a=Util.setCircle(e,t,o,r,n,i);this.compornent.addChild(a),GameStage.display.addChild(this.compornent),this.shapes.push(a)},t.prototype.setCrossShape=function(e,t,o,r,n,i,a,s){var c=Util.setLine(0,r,n,i,a,s);this.compornent.addChild(c);var l=Util.setLine(0,0,n,360-i,a,s);this.compornent.addChild(l),GameStage.display.addChild(this.compornent),this.shapes.push(c),this.shapes.push(l)},t.prototype.changeShape=function(e,t,o,r){this.shapes=[],this.compornent.removeChildren();var n=Util.setCircle(0,0,e,t,o,r);this.compornent.addChild(n),this.shapes.push(n)},t.prototype.reverseShape=function(e,t,o,r,n,i,a,s){this.shapes=[],this.compornent.removeChildren();var c=Util.setLine(0,r,n,i,a,s);this.compornent.addChild(c);var l=Util.setLine(0,0,n,360-i,a,s);this.compornent.addChild(l),this.shapes.push(c),this.shapes.push(l)},t.prototype.setMoveVector=function(e,t){this.moveVector=Util.vector(e,t)},t.prototype.move=function(){this.compornent.x+=this.moveVector[0],this.compornent.y+=this.moveVector[1]},t.prototype.checkHit=function(){this.isHit&&(this.special?this.destroy():this.circle&&!this.special?(this.destroy(),GameScene.catchCircle+=1,GameScene.circleNumber==GameScene.catchCircle&&(Bonus.bonusFlag&&Bonus.I.stopBonus(),PushMark.I.compornent.scaleX=PushMark.I.compornent.scaleY=0,GameScene.stageLevel+=1,t.moveSpeed<10&&(t.moveSpeed+=.1),GameScene.circleRate>70&&(GameScene.circleRate-=.1),GameScene.create())):Bonus.bonusFlag&&!this.circle?this.destroy():this.circle||GameOver.gameOverFlag||(console.log("x"+this.compornent.x+"y"+this.compornent.y),GameScene.nowGenerate||new GameOver(0,0,0,0)))},t.prototype.reflect=function(){(this.compornent.x<Frame.I.compornent.x||this.compornent.x>Frame.I.compornent.x+Frame.I.compornent.width)&&(this.moveVector[0]*=-1),(this.compornent.y<Frame.I.compornent.y||this.compornent.y>Frame.I.compornent.y+Frame.I.compornent.height)&&(this.moveVector[1]*=-1)},t.prototype.updateContent=function(){GameOver.gameOverFlag||(UILayer.pushFlag?!this.isHit||this.circle||Bonus.bonusFlag||GameOver.gameOverFlag||GameScene.nowGenerate||(UILayer.pushFlag=!1,PushMark.I.release(),this.reverseShape(t.crossGeneratePos[0],t.crossGeneratePos[1],t.crossWidth,t.crossWidth,this.length,45,6,ColorPallet.BULE),new GameOver(0,0,0,0)):this.checkHit(),this.move(),this.reflect())},t.mark=[],t.moveSpeed=2,t}(GameCompornent);__reflect(Mark.prototype,"Mark");var Circle=function(e){function t(t,o,r,n,i){var a=e.call(this,t,o,r,n,i)||this;return a.circle=!0,a.setCircleShape(0,0,r,a.lineColor,!1,6),a}return __extends(t,e),t}(Mark);__reflect(Circle.prototype,"Circle");var Cross=function(e){function t(t,o,r,n,i){var a=e.call(this,t,o,r,n,i)||this;return a.circle=!1,a.setCrossShape(t,o,r,n,a.length,45,6,i),a}return __extends(t,e),t}(Mark);__reflect(Cross.prototype,"Cross");var Special=function(e){function t(t,o,r,n,i){var a=e.call(this,t,o,r,n,i)||this;return a.lineColor=i,a.radius=r/2,a.circle=!0,a.special=!0,a.setCircleShape(t,o,r/2),a}return __extends(t,e),t.prototype.setCircleShape=function(e,t,o){var r=new egret.Shape;r.graphics.lineStyle(6,this.lineColor),r.graphics.beginFill(this.lineColor),r.graphics.drawCircle(0,0,o),r.graphics.endFill(),this.compornent.addChild(r),GameStage.display.addChild(this.compornent),this.shapes.push(r)},t.prototype.addDestroyMethod=function(){var e=this;GameOver.gameOverFlag||Bonus.bonusFlag||new Bonus(0,0,0,0),Mark.mark.forEach(function(t){t.compornent&&!t.circle&&t.changeShape(e.compornent.width,ColorPallet.BLACK,!1,6)})},t}(Mark);__reflect(Special.prototype,"Special");var Player=function(e){function t(){var o=e.call(this)||this;return t.I=o,o.loadStatus(),o}return __extends(t,e),t.prototype.loadStatus=function(){},t.prototype.resetStatus=function(){},t.prototype.updateContent=function(){},t.I=null,t}(GameObject);__reflect(Player.prototype,"Player");var PushMark=function(e){function t(o,r,n,i,a){var s=e.call(this,o,r,n,i)||this;return s.expansion=!0,t.I=s,s.adjustmentCompornent(),s.setCircleShape(s.compornent.anchorOffsetX,s.compornent.anchorOffsetY,n/2),s}return __extends(t,e),t.prototype.setCircleShape=function(e,t,o){var r=new egret.Shape;r.x=e,r.y=t,r.graphics.lineStyle(6,this.lineColor),r.graphics.drawCircle(0,0,o),this.compornent.addChild(r),GameStage.display.addChild(this.compornent),this.shapes.push(r)},t.prototype.adjustmentCompornent=function(){this.compornent.anchorOffsetX+=this.compornent.width/2,this.compornent.anchorOffsetY+=this.compornent.height/2,this.compornent.scaleX=this.compornent.scaleY=0},t.prototype.push=function(e,t){this.compornent.scaleX=this.compornent.scaleY=.01,this.compornent.x=e,this.compornent.y=t},t.prototype.release=function(){this.expansion=!0,this.compornent.scaleX=this.compornent.scaleY=0,this.compornent.x=this.compornent.y=0},t.prototype.switchExpansion=function(){UILayer.pushFlag&&(this.compornent.scaleX>1?this.expansion=!1:this.compornent.scaleX<.01&&(this.expansion=!0),this.expansion?this.compornent.scaleX=this.compornent.scaleY+=.01:this.compornent.scaleX=this.compornent.scaleY-=.01)},t.prototype.checkHit=function(){var e=this;UILayer.pushFlag&&Mark.mark.forEach(function(t){e.compornent.hitTestPoint(t.compornent.x,t.compornent.y)?t.isHit=!0:t.isHit=!1})},t.prototype.updateContent=function(){this.switchExpansion(),this.checkHit()},t.I=null,t}(GameCompornent);__reflect(PushMark.prototype,"PushMark");var GameOver=function(e){function t(o,r,n,i){var a=e.call(this,o,r,n,i)||this;return a.textGameOver=null,a.textScore=null,a.textColor=ColorPallet.BLACK,t.gameOverFlag=!0,a.textGameOver=Util.myText(Game.width/2,Game.height/2-50,"GAME OVER",80,1,a.textColor,!0),a.textGameOver.anchorOffsetX=a.textGameOver.width/2,a.textGameOver.anchorOffsetY=a.textGameOver.height/2,a.compornent.addChild(a.textGameOver),a.textScore=Util.myText(Game.width/2,Game.height/2+50,"LEVEL : "+GameScene.stageLevel,80,1,a.textColor,!0),a.textScore.anchorOffsetX=a.textScore.width/2,a.textScore.anchorOffsetY=a.textScore.height/2,a.compornent.addChild(a.textScore),UILayer.display.once(egret.TouchEvent.TOUCH_BEGIN,function(e){return a.tap(e)},a),a}return __extends(t,e),t.prototype.addDestroyMethod=function(){this.compornent&&this.compornent.removeChildren(),this.textGameOver=null,this.textScore=null},t.prototype.updateContent=function(){},t.prototype.tap=function(e){t.gameOverFlag=!1,GameObject.transit=Game.init,this.destroy()},t.gameOverFlag=!1,t}(UICompornent);__reflect(GameOver.prototype,"GameOver");var GameScene=function(){function e(){}return e.create=function(){e.nowGenerate=!0;var t=Mark.mark.filter(function(e){return e.destroyFlag!==!0});Mark.mark=t,e.circleNumber=0,e.catchCircle=0;var o=100;o>=65&&new Special(Mark.circleGeneratePos[0],Mark.circleGeneratePos[1],Mark.circleRadius,Mark.circleRadius,ColorPallet.RED);for(var r=0;r<e.stageLevel+10;r++){var n=Util.randomInt(0,100);if(0==r)new Circle(Mark.circleGeneratePos[0],Mark.circleGeneratePos[1],Mark.circleRadius,Mark.circleRadius,ColorPallet.BLACK),e.circleNumber+=1;else if(1==r)new Cross(Mark.crossGeneratePos[0],Mark.crossGeneratePos[1],Mark.crossWidth,Mark.crossWidth,ColorPallet.BLACK);else if(n<=e.circleRate)new Circle(Mark.circleGeneratePos[0],Mark.circleGeneratePos[1],Mark.circleRadius,Mark.circleRadius,ColorPallet.BLACK),e.circleNumber+=1;else{var i=new Cross(Mark.crossGeneratePos[0],Mark.crossGeneratePos[1],Mark.crossWidth,Mark.crossWidth,ColorPallet.BLACK);Bonus.bonusFlag&&i.changeShape(Mark.circleRadius,ColorPallet.BLACK,!1,6)}}e.nowGenerate=!1},e.stageLevel=1,e.circleRate=80,e.circleNumber=0,e.catchCircle=0,e.nowGenerate=!1,e}();__reflect(GameScene.prototype,"GameScene");var FrameLine;!function(e){e[e.UP=0]="UP",e[e.DOWN=1]="DOWN",e[e.RIGHT=2]="RIGHT",e[e.LEFT=3]="LEFT"}(FrameLine||(FrameLine={}));var Frame=function(e){function t(o,r,n,i,a){var s=e.call(this,o,r,n,i)||this;return t.I=s,s.lineColor=a,s.setShape(o,r,n,i,8),s}return __extends(t,e),t.prototype.setShape=function(e,t,o,r,n){var i=new egret.Shape;i.graphics.lineStyle(n,this.lineColor),i.graphics.drawRect(0,0,o,r),this.compornent.addChild(i),GameStage.display.addChild(this.compornent),this.shapes.push(i)},t.prototype.updateContent=function(){},t.I=null,t}(GameCompornent);__reflect(Frame.prototype,"Frame");var SaveData=function(){function e(){}return e.initial=function(){e.object={number:1,string:"js-primer","boolean":!0,"null":null,array:[1,2,3]}},e.save=function(){Util.saveJSONLocalStrage("saveData",e.object)},e.load=function(){e.object=Util.loadJSONLocalStrage("saveData")},e.deleteData=function(){e.object=null,e.load()},e.prototype.updateContent=function(){},e}();__reflect(SaveData.prototype,"SaveData");var Util=function(){function e(){}return e.init=function(e){this.height=e.stage.stageHeight,this.width=e.stage.stageWidth,this.ui=e},e.random=function(e,t){return e+Math.random()*(t-e)},e.randomInt=function(e,t){return Math.floor(e+Math.random()*(t+.999-e))},e.clamp=function(e,t,o){return t>e&&(e=t),e>o&&(e=o),e},e.color=function(e,t,o){var r=e.toFixed(0),n=t.toFixed(0),i=o.toFixed(0);r=e.toString(16),n=t.toString(16),i=o.toString(16),r=("00"+r).slice(-2),n=("00"+n).slice(-2),i=("00"+i).slice(-2);var a=parseInt("0x"+r+n+i,16);return a},e.myText=function(e,t,o,r,n,i,a){var s=new eui.Label;return s.scaleX=n,s.scaleY=n,s.bold=a,s.size=r,s.text=o,s.textColor=i,s.x=e,s.y=t,s.multiline=!0,s},e.myStrokeText=function(e,t,o,r,n,i,a,s,c){var l=new eui.Label;return l.x=e,l.y=t,l.scaleX=n,l.scaleY=n,l.textFlow=[{text:o,style:{textColor:i,size:r,fontFamily:a,strokeColor:s,stroke:c}}],l},e.saveLocalStrage=function(e,t){window.localStorage.setItem(e,t.toString())},e.loadLocalStrage=function(e,t){var o=window.localStorage.getItem(e);null==o&&(o=t.toString(),window.localStorage.setItem(e,o.toString()));var r=parseInt(o);return r},e.saveJSONLocalStrage=function(e,t){var o=JSON.stringify(t);window.localStorage.setItem(e,o)},e.loadJSONLocalStrage=function(e){var t=window.localStorage.getItem(e);null==t&&(SaveData.initial(),t=JSON.stringify(SaveData.object),window.localStorage.setItem(e,t));var o=JSON.parse(t);return o},e.setRect=function(e,t,o,r,n,i){var a=new egret.Shape;return a.x=e,a.y=t,a.graphics.beginFill(n),a.graphics.drawRoundRect(0,0,o,r,i),a.graphics.endFill(),a},e.setCircle=function(e,t,o,r,n,i){var a=o/2,s=new egret.Shape;return s.x=e,s.y=t,n?(s.graphics.beginFill(r),s.graphics.drawCircle(0,0,a),s.graphics.endFill()):(s.graphics.lineStyle(i,r),s.graphics.drawCircle(0,0,a)),s},e.setLine=function(e,t,o,r,n,i){var a=(360-r)*Math.PI/180,s=new egret.Shape;return s.x=e,s.y=t,s.graphics.lineStyle(n,i),s.graphics.moveTo(0,0),s.graphics.lineTo(o*Math.cos(a),o*Math.sin(a)),s},e.remove=function(e,t){e&&e.removeChild(t),t=null},e.vector=function(e,t,o,r){var n=(360-t)*Math.PI/180,i=[];return void 0==o&&void 0==r?(i[0]=e*Math.cos(n),i[1]=e*Math.sin(n)):(i[0]=e*Math.cos(n)-o,i[1]=e*Math.sin(n)-r),i[2]=e,i},e.cross=function(e,t){var o=e[0]*t[1]-e[1]*t[0];return o},e.dot=function(e,t){var o=e[0]*t[0]+e[1]*t[1];return o},e.cos=function(t,o){var r=Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)),n=Math.sqrt(Math.pow(o[0],2)+Math.pow(o[1],2));0>r&&(r*=-1),0>n&&(n*=-1);var i=e.dot(t,o)/(r*n);return i},e.sin=function(t,o){var r=Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)),n=Math.sqrt(Math.pow(o[0],2)+Math.pow(o[1],2));0>r&&(r*=-1),0>n&&(n*=-1);var i=e.cross(t,o)/(r*n);return i},e.size=function(e){var t=Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2));return t},e.reflectionVector=function(t,o,r){var n=e.cos(t,o),i=e.sin(t,o),a=[];switch(r){case FrameLine.RIGHT:a[0]=-t[0]*n,a[1]=0,a[2]=Math.abs(t[2]*n);break;case FrameLine.LEFT:a[0]=t[0]*n,a[1]=0,a[2]=Math.abs(t[2]*n);break;case FrameLine.UP:a[0]=0,a[1]=t[1]*i,a[2]=Math.abs(t[2]*i);break;case FrameLine.DOWN:a[0]=0,a[1]=-t[1]*i,a[2]=Math.abs(t[2]*i)}for(var s=[],c=0;1>=c;c++)s[c]=t[c]-2*a[c];return s},e}();__reflect(Util.prototype,"Util");var Button=function(e){function t(t,o,r,n,i){var a=e.call(this,t,o,r,n)||this;return a.indexText=null,a.indexTextColor=Util.color(230,230,230),a.shapeColor=Util.color(230,0,0),a.mask=null,a.maskColor=Util.color(0,0,0),a.onMask=!1,a.setCompornentStatus(t,o,r,n),a}return __extends(t,e),t.prototype.setCompornentStatus=function(e,t,o,r){this.compornent.anchorOffsetX+=o/2,this.compornent.anchorOffsetY+=r/2,this.compornent.x=e,this.compornent.y=t,this.compornent.touchEnabled=!0,this.compornent.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.tap,this)},t.prototype.setShape=function(e,t,o,r,n){this.shapes[0]&&GameObject.display.removeChild(this.shapes[0]),n&&(this.shapeColor=n),this.shapes[0]=new egret.Shape,this.shapes[0].x=0,this.shapes[0].y=0,this.shapes[0].graphics.beginFill(this.shapeColor),this.shapes[0].graphics.drawRoundRect(0,0,o,r,30),this.shapes[0].graphics.endFill(),this.compornent.addChild(this.shapes[0])},t.prototype.setMask=function(e,t,o,r,n){n&&(this.maskColor=n),this.mask=new egret.Shape,this.mask.x=0,this.mask.y=0,this.mask.alpha=0,this.mask.graphics.beginFill(this.maskColor),this.mask.graphics.drawRoundRect(0,0,o,r,30),this.mask.graphics.endFill(),this.shapes.push(this.mask),this.compornent.addChild(this.mask)},t.prototype.setIndexText=function(e,t,o,r,n,i,a,s){i=80|i,a=.5|a,this.indexTextColor=s|this.indexTextColor,this.indexText=Util.myText(e,t,n,i,a,this.indexTextColor,!0),this.indexText.width=this.compornent.width/a,this.indexText.height=this.compornent.height/a,this.indexText.textAlign=egret.HorizontalAlign.CENTER,this.compornent.addChild(this.indexText)},t.prototype.addDestroyMethod=function(){this.compornent.hasEventListener&&this.compornent.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.tap,this),this.indexText&&(this.compornent.removeChild(this.indexText),this.indexText=null)},t}(UICompornent);__reflect(Button.prototype,"Button");var CheckDate=function(e){function t(){var o=e.call(this)||this;return o.text=null,o.textColor=Util.color(230,230,230),o.s=0,t.I=o,o.getDate(),t.dateTimer=new egret.Timer(t.dateInterval,0),t.dateTimer.addEventListener(egret.TimerEvent.TIMER,o.save,o),t.dateTimer.start(),o}return __extends(t,e),t.prototype.getDate=function(){var e=window.localStorage.getItem("getLastDate");(null==e||void 0==e)&&(e=(new Date).getTime().toString(),window.localStorage.setItem("getLastDate",e));var t=parseInt(e),o=new Date;this.s=(o.getTime()-t)/1e3,this.s=parseInt(this.s.toString()),e=(new Date).getTime().toString(),window.localStorage.setItem("getLastDate",e),t=parseInt(e),this.s=(o.getTime()-t)/1e3,this.s=parseInt(this.s.toString()),this.text=Util.myText(Game.width/1.4,0,"saving...",80,.5,this.textColor,!0),this.text.alpha=0,GameObject.display.addChild(this.text)},t.prototype.save=function(){t.timerCounter+=1,this.salary(),this.autoSaveText()},t.prototype.updateContent=function(){},t.prototype.addDestroyMethod=function(){t.dateTimer.stop(),t.dateTimer.removeEventListener(egret.TimerEvent.TIMER,this.save,this)},t.prototype.salary=function(){t.timerCounter>=10},t.prototype.autoSaveText=function(){if(t.timerCounter>=10){var e=(new Date).getTime().toString();window.localStorage.setItem("getLastDate",e),t.timerCounter=0}},t.I=null,t.dateTimer=null,t.dateInterval=1e3,t.timerCounter=0,t}(GameObject);__reflect(CheckDate.prototype,"CheckDate");var GameStage=function(){function e(){this.setContainer(),e.index=GameObject.display.getChildIndex(e.display)}return e.prototype.setContainer=function(){e.display=new egret.DisplayObjectContainer,GameObject.display.addChild(e.display)},e.prototype.addDestroyMethod=function(){e.display&&(e.display.removeChildren(),GameObject.display.removeChild(e.display),e.display=null)},e.prototype.updateContent=function(){},e.display=null,e}();__reflect(GameStage.prototype,"GameStage");var Level=function(e){function t(t,o,r,n,i){var a=e.call(this,t,o,r,n)||this;return a.score=0,a.bestScore=0,a.text=null,a.textBest=null,a.textColor=65339,a.textColor=i,Score.I=a,a.score=GameScene.stageLevel,a.text=Util.myText(0,0,"LEVEL : 0",100,.5,a.textColor,!0),a.compornent.addChild(a.text),a.bestScore=Util.loadLocalStrage("Score.I.bestScore",Score.I.bestScore),a.textBest=Util.myText(0,50,"BEST : "+a.bestScore.toString(),100,.5,a.textColor,!0),a.compornent.addChild(a.textBest),a}return __extends(t,e),t.prototype.addDestroyMethod=function(){this.compornent.removeChild(this.text),this.text=null,this.compornent.removeChild(this.textBest),this.textBest=null},t.prototype.updateContent=function(){this.text.text="LEVEL : "+GameScene.stageLevel.toFixed(),this.bestScore<GameScene.stageLevel&&(this.bestScore=GameScene.stageLevel,this.textBest.text="BEST : "+this.bestScore.toFixed(),Util.saveLocalStrage("Score.I.bestScore",GameScene.stageLevel))},t.prototype.addScore=function(){this.score+=1},t.I=null,t}(UICompornent);__reflect(Level.prototype,"Level");var Score=function(e){function t(o,r,n,i,a){var s=e.call(this,o,r,n,i)||this;return s.score=0,s.bestScore=0,s.text=null,s.textBest=null,s.textColor=65339,s.textColor=a,t.I=s,s.score=0,s.text=Util.myText(0,0,"SCORE : 0",100,.5,s.textColor,!0),s.compornent.addChild(s.text),s.bestScore=Util.loadLocalStrage("Score.I.bestScore",t.I.bestScore),s.textBest=Util.myText(0,50,"BEST : "+s.bestScore.toString(),100,.5,s.textColor,!0),s.compornent.addChild(s.textBest),s}return __extends(t,e),t.prototype.addDestroyMethod=function(){this.compornent.removeChild(this.text),this.text=null,this.compornent.removeChild(this.textBest),this.textBest=null},t.prototype.updateContent=function(){this.text.text="SCORE : "+this.score.toFixed(),this.bestScore<this.score&&(this.bestScore=this.score,this.textBest.text="BEST : "+this.bestScore.toFixed(),Util.saveLocalStrage("Score.I.bestScore",t.I.bestScore))},t.prototype.addScore=function(){this.score+=1},t.I=null,t}(UICompornent);__reflect(Score.prototype,"Score");var UILayer=function(){function e(){this.setContainer(),e.index=GameObject.display.getChildIndex(e.display),e.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.push,this),e.display.addEventListener(egret.TouchEvent.TOUCH_END,this.push,this),e.display.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.out,this)}return e.prototype.setContainer=function(){e.display=new eui.UILayer,GameObject.display.addChild(e.display)},e.prototype.push=function(t){GameOver.gameOverFlag||(t.touchDown?(e.pushFlag=!0,PushMark.I.push(t.stageX,t.stageY)):(e.pushFlag=!1,PushMark.I.release()))},e.prototype.out=function(t){GameOver.gameOverFlag||(e.pushFlag=!1)},e.prototype.addDestroyMethod=function(){e.display&&(e.display.removeChildren(),e.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.push,this),e.display.removeEventListener(egret.TouchEvent.TOUCH_END,this.push,this),e.display.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.push,this),GameObject.display.removeChild(e.display),e.display=null)},e.prototype.updateContent=function(){},e.display=null,e.pushFlag=!1,e}();__reflect(UILayer.prototype,"UILayer");