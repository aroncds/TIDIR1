var Janela = function (){
    iGame.Node.apply(this);
    
    var montanha = null;
    var particula = null;
    var fundo = null;
    var sequence= null;
    var that = this;
    
    this.Load = function(){
        iGame.Asset.loadTexture("Asset/fundo.png");
        iGame.Asset.loadTexture("Asset/montanha.png");
        iGame.Asset.loadTexture("Asset/fumaca.png");
    };
    
    this.Update = function(){
        particula.Update();
    };
    
    this.AddObjects = function (){
        fundo = iGame.Asset.getSprite("Asset/fundo.png");
        this.addChild(fundo);
        
        montanha = iGame.Asset.getSprite("Asset/montanha.png");
        montanha.position = new iGame.Vector2(-25,150);
        
        this.addChild(montanha);
        
        particula = new iGame.ParticleSystem({texture:iGame.Asset.textures["Asset/fumaca.png"], vel:new iGame.Vector2(40,30),scale: new iGame.Vector2(4,4), timer: 3000, count:50});
        particula.createParticles();
        particula.rotate = 180;
        particula.position = new iGame.Vector2(550,250);
        
        this.addChild(particula);
    };
};