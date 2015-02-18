var Raio = function(){
    iGame.Node.apply(this);
    
    var sprite = null;
    var timer = 0;
    var velY = 0;
    var sentido = false;
    var that = this;
    
    this.Load = function(){
        iGame.Asset.loadTexture("Asset/raio.png");
    };
    
    this.AddObjects = function(){
        sprite = iGame.Asset.getSprite("Asset/raio.png");
        this.addChild(sprite);
    };
    
    this.Update = function(){
        timer += 0.033;
        velY += 0.05;
        
        if(!sentido) that.position.Y += velY;
        else that.position.Y -= velY;
        
         if(timer > 1){
            velY -= 0.2;
            if(velY <= 0){
                timer = 0;
                sentido = !sentido;
            }
        }
    };
};