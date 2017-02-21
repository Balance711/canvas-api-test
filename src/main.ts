window.onload = () => {

    var c = document.getElementById("Mycanvas") as HTMLCanvasElement
    var context = c.getContext("2d");
    context.fillStyle = "#FF0000";
    context.font = "20px Arial";
    var stage = new DisplayObjectContainer();
    stage.alpha = 0.5
    var textF = new TextField();
    textF.text = "Hello World";
    textF.x = 150;
    textF.y = 50;

    var bitmap1 = new Bitmap();
    bitmap1.setSrc("1.jpg");
    bitmap1.x = 100;
    bitmap1.y = 100;
    bitmap1.alpha = 0.8
    bitmap1.rotation = 30;

    stage.addChild(bitmap1);
    stage.addChild(textF);

    bitmap1.scaleX = 0.5;

    setInterval(() => {
        textF.y += 10;
        bitmap1.x += 10;

        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, 800, 800);
        stage.draw(context);

    }, 500)
};

interface Drawable {
    draw(context: CanvasRenderingContext2D);

}
class DisplayObject implements Drawable {
    x = 0;
    y = 0;

    alpha = 1;
    protected globalAlpha = 1;

    scaleX = 1;
    scaleY = 1;

    rotation = 0;

    matrix = new math.Matrix(1, 0, 0, 1, 0, 0);
    protected globalMatrix = new math.Matrix(1, 0, 0, 1, 0, 0);

    parent: DisplayObjectContainer = null;

    draw(context: CanvasRenderingContext2D) {
        this.matrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);

        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            this.globalMatrix = math.matrixAppendMatrix(this.parent.globalMatrix, this.matrix);//this.parent.globalMatrix * this.matrix;
        } else {
            this.globalAlpha = this.alpha;
            this.globalMatrix = this.matrix;

        }
        context.globalAlpha = this.globalAlpha;
        var gMatrix = this.globalMatrix;
        context.setTransform(gMatrix.a, gMatrix.b, gMatrix.c, gMatrix.d, gMatrix.tx, gMatrix.ty);
        this.render(context);

    }

    render(context: CanvasRenderingContext2D) { }
}

class DisplayObjectContainer extends DisplayObject {
    CanvasArray: DisplayObject[] = [];

    addChild(newObject: DisplayObject) {
        this.CanvasArray.push(newObject);
        newObject.parent = this;
    }

    removeChild(displayObject: DisplayObject) {
        var copyArray = this.CanvasArray
        for (let arrayobject of this.CanvasArray) {
            if (arrayobject == displayObject) {
                var objectIndex = this.CanvasArray.indexOf(arrayobject);
                copyArray.splice(objectIndex, 1);
                break;
            }
        }
        this.CanvasArray = copyArray;
    }

    render(context: CanvasRenderingContext2D) {
        for (let c of this.CanvasArray) {
            c.draw(context);
        }
    }
}

class Bitmap extends DisplayObject {
    private Img = new Image();
    private isLoaded = false;
    setSrc(src: string) {
        this.Img.src = src;
        this.Img.onload = () => {
            console.log("加载");
            this.isLoaded = true;
        }
    }
    render(context: CanvasRenderingContext2D) {
        if (this.isLoaded) {
            console.log("不需要加载")
            context.drawImage(this.Img, 0, 0);
        } else {
            this.Img.onload = () => {
                console.log("需要加载")
                context.drawImage(this.Img, 0, 0);

            }
            this.isLoaded = true;
        }
    }

}

class TextField extends DisplayObject {
    text = "space";

    render(context: CanvasRenderingContext2D) {
        // var textField = new TextField();
        context.fillText(this.text, 0, 0);
    }
}