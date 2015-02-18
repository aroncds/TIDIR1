var Dialog = function(){
    iGame.Node.apply(this);
    
    var personagem = null;
    var raio = null;
    var roteiro = null;
    var fundo=null;
    var caixaD = null;
    this.on = false;
    var text = null;
    var mae = null;
    
    this.Load = function(){
         iGame.Asset.loadTexture("Asset/personagem_dialog.png");
         iGame.Asset.loadTexture("Asset/raio.png");
         iGame.Asset.loadTexture("Asset/mae.png");
    };
    
    this.createObjects = function(){
        personagem = iGame.Asset.getSprite("Asset/personagem_dialog.png");
        personagem.position = new iGame.Vector2(30, 220);
        
        mae = iGame.Asset.getSprite("Asset/mae.png");
        mae.position = new iGame.Vector2(520,260);
        
        raio = iGame.Asset.getSprite("Asset/raio.png");
        raio.position = new iGame.Vector2(500,300);
        raio.scale = new iGame.Vector2(1.2,1.2);
        
        fundo = new iGame.Rect({width:800, height:600});
        fundo.alpha = 0.4;
        
        caixaD = new iGame.Rect({width:800, height:100, color:"Red"});
        caixaD.position.Y = 500;
        
        this.addChild(fundo);
        this.addChild(caixaD);
        this.addChild(raio);
        this.addChild(mae);
        this.addChild(personagem);
    };
    
    this.setFundoAlpha = function (valor) {
        fundo.alpha = valor;
    };
    
    this.CurrentChar = function(target, fala){
        this.removeChild(text);
        
        if(this.scale.X === 1)
        this.position.X = stage.position.X * -1;
    
        console.log(fala +  " : " + fala.length);
        
         text = new iGame.Text({
            text:fala,
            size:30,
            font: "arial"
        });
        
        text.addLetterBySecond();
        
        this.visible = true;
        
        if(target === "player") {
            raio.visible = false;
            personagem.visible = true;
            mae.visible = false;
            text.position = new iGame.Vector2(130, 280);
        }
        else if (target==="raio") {
            raio.visible = true;
            personagem.visible = false;
            mae.visible = false;
            text.position = new iGame.Vector2(25, 280);
        }else if(target==="mae"){
            mae.visible = true;
            raio.visible = false;
            personagem.visible = false;
            text.position = new iGame.Vector2(25,280);
        }
        
        this.addChild(text);
        
        this.on = true;
    };
    
    this.CloseDialog = function(){
        this.visible = false;
        this.on = false;
    };
};