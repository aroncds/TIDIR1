var Ui = function(){
    iGame.Node.apply(this);
    iGame.Event.apply(this);
    
    var button_correct = null;
    var button_error = null;
    var that = this;
    var width = 242;
    var height = 261;
    
    this.Load = function(){
        iGame.Asset.loadTexture("Asset/button_correct.png");
        iGame.Asset.loadTexture("Asset/button_error.png");
    };
    
    this.addObjects = function(){
      button_correct = iGame.Asset.getSprite("Asset/button_correct.png");
      button_error = iGame.Asset.getSprite("Asset/button_error.png");
      
      button_correct.position = new iGame.Vector2(50,100);
      button_error.position = new iGame.Vector2(300, 100);
      
      this.addChild(button_correct);
      this.addChild(button_error);
      this.visible = false;
    };
    
    this.display = function(){
        this.visible = true;
        if(this.scale.X ===1)
        this.position.X = stage.position.X * -1;
        this.stage.addEventListener("mousedown", function(e){
            if(hitTestPoint(that.stage.mousePosition, {X:button_correct.position.X, Y:button_correct.position.Y, width:width, height:height})){
                that.visible = false;
                that.dispatchEvent("SelectCorrect");
                that.removeLastEvent("SelectError");
                that.removeLastEvent("SelectCorrect");
                that.stage.removeLastEvent("mousedown");
            }else if(hitTestPoint(that.stage.mousePosition, {X:button_error.position.X, Y:button_error.position.Y, width:width, height:height})){
                that.visible = false;
                that.dispatchEvent("SelectError");
                that.removeLastEvent("SelectError");
                that.removeLastEvent("SelectCorrect");
                that.stage.removeLastEvent("mousedown");
            }
        });
    };
    
    var hitTestPoint = function(position, target){
        if(position.X > target.X && position.X < target.X + target.width && position.Y > target.Y && position.Y < target.Y + target.height){
            return true;
        }
        return false;
    };
};