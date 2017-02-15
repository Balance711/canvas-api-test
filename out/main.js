var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var canvas = document.getElementById("canvasTest");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#00FFFF";
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
    Mybitmap.MyImg.src = "MyImg.jpg";
    Mybitmap.x = 100;
    Mybitmap.y = 100;
    stage.addchild(textF);
    stage.addchild(textS);
    stage.addchild(Mybitmap);
    stage.draw(ctx);
};
var DisplayObjectContainer = (function () {
    function DisplayObjectContainer() {
        this.x = 0;
        this.y = 0;
        this.CanvasArray = [];
    }
    DisplayObjectContainer.prototype.addchild = function (newContext) {
        this.CanvasArray.push(newContext);
    };
    DisplayObjectContainer.prototype.draw = function (context) {
        for (var _i = 0, _a = this.CanvasArray; _i < _a.length; _i++) {
            var c = _a[_i];
            c.draw(context);
        }
    };
    return DisplayObjectContainer;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.MyImg = new Image();
        return _this;
    }
    Bitmap.prototype.draw = function (context) {
        var _this = this;
        this.MyImg.onload = function () {
            context.drawImage(_this.MyImg, _this.x, _this.y);
        };
    };
    return Bitmap;
}(DisplayObjectContainer));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = "space";
        return _this;
    }
    TextField.prototype.draw = function (context) {
        var textField = new TextField();
        context.font = "20px Arial";
        context.fillText(this.text, this.x, this.y, 100);
    };
    return TextField;
}(DisplayObjectContainer));
//# sourceMappingURL=main.js.map