class Mark extends GameCompornent{

    lineColor : number;
    length : number;
    isHit :boolean = false;
    static moveSpeed : number = 1;
    moveVector : number[] = [];

    constructor(x : number, y : number, width : number, height : number, lineColor:number){
        super(x,y,width,height);
        this.lineColor = lineColor;
        this.length = Math.sqrt(width**2 + height**2);
        this.setMoveVector(2, 45);

    }

    setCircleShape(x : number, y : number, radius:number){
        const shape:egret.Shape = new egret.Shape();
/*        shape.x = x;
        shape.y = y;*/
        shape.graphics.lineStyle(6,this.lineColor);
        shape.graphics.drawCircle(0, 0, radius);
        this.compornent.addChild(shape);
        GameStage.display.addChild(this.compornent);
        this.shapes.push(shape);
    }

    setCrossShape(x: number, y: number, width : number, height : number, length: number, degree: number, lineWidth: number, lineColor: number){
        const shape:egret.Shape = Util.setLine(0, 0, length,degree, lineWidth, lineColor);
        this.compornent.addChild(shape);

        const shape2:egret.Shape = Util.setLine(0, 0 + height, length, 360-degree, lineWidth, lineColor);
        this.compornent.addChild(shape2);
        GameStage.display.addChild(this.compornent);

        this.shapes.push(shape);
        this.shapes.push(shape2);
    }

    setMoveVector(size : number, degree : number){
        this.moveVector = Util.vector(size, degree);
    }

    move(){
        this.compornent.x += this.moveVector[0];
        this.compornent.y += this.moveVector[1];//Egret はy軸が下向き
    }

    //反射ベクトル = 入射べクトル - 法線ベクトル*2
    //https://thinkit.co.jp/article/8466
    reflect(wallVector: number[]){
        if(this.isHit){
            this.moveVector = Util.reflectionVector(this.moveVector, wallVector);
            this.isHit = false;
        }
    }

    checkHit(){
        for(let i = 0; i <=3; i++){
            if(Frame.I.shapes[i].hitTestPoint(this.compornent.x, this.compornent.y, true)){
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
    }

    updateContent(){
        this.move();
        this.checkHit();
    }

}

class Circle extends Mark{

    lineColor : number;

    constructor(x : number, y : number, width : number, height : number, lineColor:number){
        super(x,y,width,height,lineColor);
        this.setCircleShape(x,y,width/2);
    }



}

class Cross extends Mark{

    lineColor : number;
    length : number;

    constructor(x: number, y: number, width : number, height : number, lineColor: number){
        super(x,y,width,height,lineColor);
        this.setCrossShape(x,y,width,height,this.length,45,6,lineColor);
    }


}