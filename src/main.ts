window.onload = () => {

   var canvas=document.getElementById("canvasTest") as HTMLCanvasElement;
   var ctx=canvas.getContext("2d");
   ctx.fillStyle="#00FFFF";

   var stage = new DisplayObjectContainer();
   var textF = new TextField();
   var textS = new TextField();
   textF.text = "Hello";
   textS.text = "       World";
   textF.x = 20;
   textF.y = 20;
   textS.x = 35;
   textS.y = 35;

   var Mybitmap = new Bitmap();
   Mybitmap.MyImg.src = "MyImg.jpg"
   Mybitmap.x = 100;
   Mybitmap.y = 100;
   stage.addchild(textF);
   stage.addchild(textS);
   stage.addchild(Mybitmap);
   stage.draw(ctx);

};

interface DrawSomething{
    draw(context:CanvasRenderingContext2D);
}

class DisplayObjectContainer implements DrawSomething{
    x:number = 0;
    y:number = 0;
    CanvasArray: DisplayObjectContainer[] = [];

    addchild(newContext:DisplayObjectContainer){
        this.CanvasArray.push(newContext);
    }
    draw(context:CanvasRenderingContext2D){
        for(let c of this.CanvasArray){
            c.draw(context);
        }
    }
}

class Bitmap extends DisplayObjectContainer{
    MyImg = new Image();
    draw(context:CanvasRenderingContext2D){
        this.MyImg.onload = () =>{
            context.drawImage(this.MyImg,this.x,this.y);
        }
    }
}

class TextField extends DisplayObjectContainer{
    text: string = "space";
    draw(context:CanvasRenderingContext2D){
        var textField = new TextField();
        context.font = "20px Arial"
        context.fillText(this.text,this.x,this.y,100);
    }
}