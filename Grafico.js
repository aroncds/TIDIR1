var Grafico = function(){
  iGame.Node.apply(this);
  
  var graphics = new Array();
  var texts = new Array();
  var dados = new Array();
  var gWidth = 500;
  var gHeight = 400;
  var width = 50;
  var max = 0;
  var min = 99999;
  var fundo = new iGame.Rect({X:0,Y:0, width:10000, height:10000, color:"white"});
  var pilha = null;
  var _texts = new Array();
  
  this.setDados = function(dado, legenda){
      dados.push({dado:dado, legenda:legenda});
      if(dado > max) max = dado;
      if(dado < min) min = dado;
  };
  
  this.loadTexture = function(){
      iGame.Asset.loadTexture("Asset/pilha.png");
  };
  
  this.createGraphics = function(){
      this.addChild(fundo);
      fundo.position = new iGame.Vector2(-2000, -2000);
      for(var i = 0; i < dados.length; i++){
          var height = (dados[i].dado * gHeight)/max;
          var scaleX = dados[i].dado / max;
          
          var pilha = iGame.Asset.getSprite("Asset/pilha.png");
          pilha.position = new iGame.Vector2(50+(i*(width+50)), -20);
          pilha.scale = new iGame.Vector2(scaleX,0.1);
          
          _texts[0] = new iGame.Text({text:"Quantidade de fumaça emitida por hora.", size: 40});
          _texts[0].position = new iGame.Vector2(25,-200);
          this.addChild(_texts[0]);
          
          //new iGame.Rect({X: 50+(i*(width+50)),Y:-20 , width: width, height: height });
          
          graphics.push(pilha);
          texts.push(new iGame.Text({text:dados[i].legenda, size:20}));
          
          var tween = new iGame.Tween(pilha);
          tween.scaleTo({X:1, Y:(i == 0 ? -1.7:-0.7) }, 2000);
          
          texts[i].position = new iGame.Vector2(40+(i*50),0);
         
          this.addChild(pilha);
          this.addChild(texts[i]);
      }
      
      var line = new iGame.Line({});
      line.addPointLine(400,-0);
      line.position.Y = -20;
      this.addChild(line);
      
      var line2 = new iGame.Line({});
      line2.addPointLine(0,-305);
      this.addChild(line2);
      line2.position.Y = -20;
      
      var zero = new iGame.Text({text:"0"});
      this.addChild(zero);
      zero.position = new iGame.Vector2(-10,-0);
      
      var h = max/5;
      
      for(var i =0; i < 5; i++){
          var t = new iGame.Text({text:parseFloat((i+1)*h).toFixed(2), align:"end"});
          var l = new iGame.Line({});
          l.addPointLine(400,0);
          l.position = new iGame.Vector2(0,-( (i+1)*(325/5)));
          l.alpha = 0.7;
          t.position = new iGame.Vector2(-10, -( (i+1)*(310/10)));
          this.addChild(t);
          this.addChild(l);
      }
  };
};