var Player = function(){
    iGame.Node.apply(this);
    
    var animations = new Array();
    var state = "walk";
    
    this.Load = function(){
        iGame.Asset.loadTexture("Asset/personagem.png");
        iGame.Asset.loadTexture("Asset/parado.png");
        iGame.Asset.loadTexture("Asset/dormindo.png");
        iGame.Asset.loadTexture("Asset/sentado.png");
    };
    
    this.AddObjects= function(){
        animations["walk"] = iGame.Asset.getSpriteTile("Asset/personagem.png", 5,1);
        animations["walk"].visible = false;
        animations["idle"] = iGame.Asset.getSprite("Asset/parado.png");
        animations["idle"].visible = false;
        animations["sleep"] = iGame.Asset.getSprite("Asset/dormindo.png");
        animations["sleep"].visible = false;
        animations["sit"] = iGame.Asset.getSpriteTile("Asset/sentado.png");
        animations["sit"].visible = false;
        this.addChild(animations["idle"]);
        this.addChild(animations["walk"]);
        this.addChild(animations["sleep"]);
        this.addChild(animations["sit"]);
        this.playAnimation("walk");
    };
    
    this.playAnimation = function(anim){
        animations[state].visible = false;
        animations[anim].visible = true;
        state = anim;
    };
    
    this.Update = function(){
        if(animations[state].update)
            animations[state].update();
    };
};