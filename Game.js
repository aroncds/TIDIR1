var Game = function(){
    iGame.Node.apply(this);

    var player = null;
    var raio = null;
    var tv = null;
    var radio = null;
    var chao = null;
    var chao2=null;
    var fundo = null;
    var fundo_casa = null;
    var janela = null;
    var janela_fundo = null;
    var tapete = null;
    var quadro = null;
    var sofa = null;
    var mesa = null;
    var timer = 0;
    var that = this;
    var dialog = null;
    var sequence = null;
    var ui = new Ui();
    var grafico = null;
    var xml =null;
    var transition = null;
    var stageT = null;
    var dialog_timer = 3000;
    var tween = null;
    var tremor = false;
    var movie = false;
    
    this.Update = function(){
        if(!dialog.on){
            timer += 0.3;
            if(timer>.6){
                player.Update();
                timer= 0;
                if(movie.visible) movie.update();
            }
            raio.Update();
        }
        janela_fundo.Update();
        
    };
    
    this.init = function(){
        tween = new iGame.Tween(player);
        tween.moveTo({X:100,Y:320}, 2000);
        
        tween.addEventListener("TweenComplete", function(){
           tween.removeLastEvent("TweenComplete");
           player.playAnimation("idle");
        });
        
        stageT = new iGame.Tween(stage);
        
        /*this.generateSequence(sequence);
        sequence.start();*/
        
        sequence.addSequence(dialog_timer, function(){
            dialog.CurrentChar("player", "Mãe cheguei!!");
          
        });
        
        sequence.addSequence(3000, function(){
           dialog.CurrentChar("mae","Sim Arnald, como foi seu dia na escola?");
        });
        
        sequence.addSequence(dialog_timer, function(){
           dialog.CurrentChar("player", "Foi muito bom!"); 
        });
        
        sequence.addSequence(dialog_timer, function(){
           dialog.CurrentChar("player", "Mãe vou jogar video game um pouco!"); 
        });
        
        sequence.addSequence(dialog_timer, function(){
           dialog.CurrentChar("mae", "Tudo bem Arnald!"); 
        });
        
        sequence.addSequence(dialog_timer, function(){
           dialog.CurrentChar("mae", "Mas so até o almoço ficar pronto!"); 
        });
        
        sequence.addSequence(dialog_timer, function(){
            dialog.CurrentChar("mae", "você precisa estudar após o almoço!");
        });
        
        sequence.addSequence(dialog_timer, function(){
           dialog.CurrentChar("player", "Tudo bem mãe!");
        });
        
        sequence.addSequence(2000, function(){
           dialog.CloseDialog();
           tween.moveTo({X:800, Y:320}, dialog_timer);
           stageT.moveTo({X:-400, Y:0}, dialog_timer);
           player.playAnimation("walk");
           
           tween.addEventListener("TweenComplete", function(){
              player.playAnimation("sit");
              tween.removeLastEvent("TweenComplete");
              movie.visible= true;
           });
        });
        
        sequence.addSequence(10000, function(){
            
        });
       
        sequence.addSequence(dialog_timer, function(){
           dialog.CurrentChar("player", "Acho que estou com um pouco de sono..."); 
        });
        
        sequence.addSequence(dialog_timer, function(){
           player.playAnimation("idle");
           dialog.CurrentChar("player", "Vou dormir um pouco..."); 
        });
        
        sequence.addSequence(dialog_timer, function(){
           dialog.CloseDialog();
           player.scale.X = -0.5;
           tween.moveTo ({X:550, Y:320}, dialog_timer);
           stageT.moveTo({X:-300, Y:0}, 3000);
           player.playAnimation("walk");
           
           tween.addEventListener("TweenComplete", function(){
              player.rotate = 1.5;
              player.position.Y+=150;
              player.playAnimation("sleep");
              tween.removeLastEvent("TweenComplete");
           });
        });
        
        sequence.addSequence(7000, function(){
            dialog.CurrentChar("player", "ZZZZzzzZZzzz..."); 
        });
        
        sequence.addSequence(dialog_timer, function(){
            transition = new iGame.Node();
            var rect = new iGame.Rect({width:800,height:600});
            var text = new iGame.Text({text:"2 horas depois...", align:"center", color:"#ffffff", size:40});
            text.position = new iGame.Vector2(200,150);
            transition.addChild(rect);
            transition.addChild(text);
            transition.position.X = stage.position.X * -1;
            that.addChild(transition);
        });
        
        sequence.addSequence(5000, function(){
            that.removeChild(transition);
        });
        
        sequence.addSequence(2000, function(){
            dialog.CloseDialog();
            stageT.moveTo({X:-250, Y:0}, 2000); 
            raio.visible=true;
           /* stageT.moveTo({X:stage.position.X - 10, Y:stage.position.Y -10}, 50);
                
            stageT.addEventListener("TweenComplete", volta);
            tremor = true;
            function vai(){
                stageT.removeLastEvent("TweenComplete");
                if(tremor){
                    stageT.moveTo({X:stage.position.X - 10, Y:stage.position.Y -10},50);
                    stageT.addEventListener("TweenComplete", volta);
                }else stage.position = new iGame.Vector2(-255,0);
            }

            function volta(){
                stageT.removeLastEvent("TweenComplete");
                if(tremor){
                    stageT.moveTo({X:stage.position.X + 10, Y:stage.position.Y +10},50);
                    stageT.addEventListener("TweenComplete", vai);
                }else stage.position = new iGame.Vector2(-255,0);
            } */
            
        });
        sequence.addSequence(1000, function(){
           tremor = false; 
        });
        sequence.addSequence(2000, function(){
            player.position.Y-=150;
            player.scale.X = 0.5;
            player.rotate = 0; 
            player.playAnimation("idle");
        });
        
        sequence.addSequence(dialog_timer, function(){
            dialog.CurrentChar("player", "Quem é você?");
        });
        
        sequence.addSequence(dialog_timer, function(){
            dialog.CurrentChar("player", "O que está fazendo aqui?");
        });
        
        sequence.addSequence(dialog_timer, function(){
            dialog.CurrentChar("raio", "Olá, muito prazer!");
        });
        
        sequence.addSequence(dialog_timer, function(){
            dialog.CurrentChar("raio", "Meu nome é Raim!");
        });
        
        sequence.addSequence(dialog_timer, function(){
            dialog.CurrentChar("raio", "E estou aqui por um motivo!");
        });
        
        sequence.addSequence(3000, function(){
            dialog.CurrentChar("raio", "você acha que é bom ou ruim ?");
        });
        
        sequence.addSequence(1000, function(){
            ui.display();
            sequence.pause();

            ui.addEventListener("SelectCorrect", function(){
               dialog.CurrentChar("raio", "Que pena! você errou!");
               sequence.start();
            });

            ui.addEventListener("SelectError", function(){
               dialog.CurrentChar("raio", "Parabéns! Você acertou!");
               sequence.start();
            }); 
        });
        
        sequence.addSequence(3000, function(){
            dialog.CurrentChar("raio", "Você está deixando equipamentos");
        });
        
        sequence.addSequence(dialog_timer, function(){
            dialog.CurrentChar("raio", "eletrônicos ligados, enquanto dorme!");
        });
        
        sequence.addSequence(dialog_timer , function(){
           dialog.CurrentChar("raio", "Olhe só para esta sala!");
        });
        
        sequence.addSequence(dialog_timer, function(){ 
            dialog.CloseDialog();
            stageT.moveTo({X:stage.position.X + 50, Y:0}, 2000);
        });
        
        sequence.addSequence(dialog_timer, function(){
            stageT.moveTo({X:stage.position.X - 150, Y:0},2000);
        });
        
        /*sequence.addSequence(dialog_timer, function(){
           dialog.CurrentChar("raio", "voce ve algum problema?"); 
        });
        
        sequence.addSequence(1000, function(){
           ui.display();
           sequence.pause();
           
           ui.addEventListener("SelectCorrect", function(){
              dialog.CurrentChar("raio", "Isso!! ha muitos equipamentos ligados!");
              sequence.start();
           });
           
           ui.addEventListener("SelectError", function(){
              dialog.CurrentChar("raio", "Nao esta errado!! Ha muitos equipamentos ligados!");
              sequence.start();
           });
        });*/
        
        sequence.addSequence(dialog_timer, function(){
           dialog.CurrentChar("player", "ham??"); 
        });
        
        sequence.addSequence(dialog_timer, function(){
           dialog.CurrentChar("player", "há algum problema??"); 
        });
        
        sequence.addSequence(dialog_timer, function(){
           dialog.CurrentChar("raio", "Claro que sim!"); 
        });
        
        sequence.addSequence(dialog_timer, function(){
            dialog.CurrentChar("raio", "Os aparelhos precisam de energia");
        });
        
        sequence.addSequence(dialog_timer, function(){
            dialog.CurrentChar("raio", "para funcionar!");
        });
        
        sequence.addSequence(dialog_timer, function(){
            dialog.CurrentChar("player", "Haa então e por isso que deve ligar");
        });
        
        sequence.addSequence(dialog_timer, function(){
            dialog.CurrentChar("player", "os aparelho na tomada, é isso?");
        });
        
        sequence.addSequence(dialog_timer, function(){
            dialog.CurrentChar("raio", "Isso mesmo!");
        });
        
        sequence.addSequence(dialog_timer, function(){
           dialog.CurrentChar("raio", "E essa energia, precisa ser produzida"); 
        });
        
        sequence.addSequence(dialog_timer, function(){
           dialog.CurrentChar("raio", "utilizando recursos da natureza!"); 
        });

        
        sequence.addSequence(dialog_timer,function(){
           dialog.CurrentChar("player", "Mas de onde vem essa energia?") 
        });
        
        sequence.addSequence(dialog_timer, function(){
            dialog.CurrentChar("raio", "Olhe para a janela!");
        });
        
        
        sequence.addSequence(5000, function(){
           dialog.CloseDialog();
           stageT.moveTo({X:-2300, Y:-800},4000);
           stageT.scaleTo({X:4, Y:4.5},4000);
           
           stageT.addEventListener("TweenComplete", function(){
                stage.scale = new iGame.Vector2(4,4.5);
                stage.position = new iGame.Vector2(-2300,-800);
                that.dialogQuimica();
                raio.visible = false;
                
                stageT.removeLastEvent("TweenComplete");
            });
        });
        
        sequence.start();
    };

    this.AddObjects = function(){
        movie = iGame.Asset.getSpriteTile("Asset/movie.png", 5,1);
        movie.position = new iGame.Vector2(965,365);
        movie.scale = new iGame.Vector2(0.6,0.6);
        movie.rotate = 0.2;
        movie.visible = false;
        player.AddObjects();
        raio.AddObjects();
        
        dialog.createObjects();
        dialog.visible = false;
        ui.addObjects();
        
        fundo = new iGame.Rect({width:1400, height:600, color:"#CCCCCC"});
        
        janela_fundo.AddObjects();
        janela_fundo.scale = new iGame.Vector2(0.23,0.24);
        janela_fundo.position = new iGame.Vector2(580,160);
        
        sequence=new iGame.Sequence();
        
        chao.position.Y = 550;
        chao2.position = new iGame.Vector2(chao2.width-10, 550);
        fundo.scale.X = 2;
        janela.position = new iGame.Vector2(500, 140);
        janela.scale = new iGame.Vector2(1.1,1.1);
        
        tv.position = new iGame.Vector2(940, 350);
        radio.position = new iGame.Vector2(600, 460);
        radio.scale = new iGame.Vector2(0.5,0.5);
        
        player.position.Y = 320;
        player.scale = new iGame.Vector2(0.5,0.5);
        
        raio.position = new iGame.Vector2(750,150);
        raio.scale = new iGame.Vector2(0.8,0.8);
        
        sofa.position = new iGame.Vector2(300, 350);
        
        mesa.position = new iGame.Vector2(200, 290);
        
        fundo_casa.position = new iGame.Vector2(-100,-10);
        fundo_casa.scale = new iGame.Vector2(1.5,1.4);
        
        quadro.position = new iGame.Vector2(950,200);
        quadro.scale = new iGame.Vector2(1.3,1.3);
        
        tapete.position = new iGame.Vector2(570, 520);
        

        this.addChild(fundo);
        this.addChild(fundo_casa);
        this.addChild(quadro);
        this.addChild(janela_fundo);
        this.addChild(janela);
        this.addChild(tv);
        this.addChild(movie);
        this.addChild(tapete);
        this.addChild(sofa);
        this.addChild(mesa);
        this.addChild(player);
        this.addChild(raio);
        this.addChild(grafico)
        this.addChild(dialog);
        this.addChild(ui);;
        
        raio.visible= false;
        
        this.init();
    };

    this.Load = function(){
        
        
        player = new Player();
        player.Load();
        
        raio = new Raio();
        raio.Load();
        
        dialog = new Dialog();
        dialog.Load();
        
        janela_fundo = new Janela();
        janela_fundo.Load();
        
        ui.Load();
        
        grafico = new Grafico();
        grafico.loadTexture();
        
        //xml = new iGame.Xml();
        //xml.load("Asset/roteiro.xml");
        
        iGame.Asset.loadTexture("Asset/chao_casa.png",function(){
            chao=iGame.Asset.getSprite("Asset/chao_casa.png");
            chao2=iGame.Asset.getSprite("Asset/chao_casa.png");
        });
        iGame.Asset.loadTexture("Asset/movie.png");
        iGame.Asset.loadTexture("Asset/janela.png", function(){janela = iGame.Asset.getSprite("Asset/janela.png");});
        iGame.Asset.loadTexture("Asset/radio.png", function(){radio = iGame.Asset.getSprite("Asset/radio.png");});
        iGame.Asset.loadTexture("Asset/tv.png", function(){tv = iGame.Asset.getSprite("Asset/tv.png");});
        iGame.Asset.loadTexture("Asset/sofa.png", function(){sofa = iGame.Asset.getSprite("Asset/sofa.png")});
        iGame.Asset.loadTexture("Asset/mesa.png", function(){mesa = iGame.Asset.getSprite("Asset/mesa.png")});
        iGame.Asset.loadTexture("Asset/fundo_casa.png", function(){fundo_casa=iGame.Asset.getSprite("Asset/fundo_casa.png");});
        iGame.Asset.loadTexture("Asset/quadro.png", function(){quadro = iGame.Asset.getSprite("Asset/quadro.png");});
        iGame.Asset.loadTexture("Asset/tapete.png", function(){tapete = iGame.Asset.getSprite("Asset/tapete.png");});
    };
    
    this.dialogQuimica = function(){
      sequence= new iGame.Sequence();
      
        dialog.scale = new iGame.Vector2(0.25, 0.25);
        dialog.position= new iGame.Vector2(575,162);
        
        ui.scale = new iGame.Vector2(0.25,0.25);
        ui.position = new iGame.Vector2(575,162);
        
        sequence.addSequence(1000, function(){
             dialog.CurrentChar("raio", "Aquilo é um lugar para produzir energia!");
        });
        
        sequence.addSequence(dialog_timer, function(){
             dialog.CurrentChar("raio", "que se chama Termoelétrica");
        });
        
        sequence.addSequence(dialog_timer, function(){
           dialog.CurrentChar("raio", "repare que ela está jogando muita fumaça!"); 
        });
        
        sequence.addSequence(1000, function(){
           dialog.CurrentChar("raio", "Quanto mais energia você gasta");
        });
        
        sequence.addSequence(1500, function(){
            dialog.CurrentChar("raio", "mais fumaça e jogado no ar");
        });
        
        sequence.addSequence(1500, function(){
            dialog.CurrentChar("raio", "voce acha que isso é algo bom ou ruim?");
        });
        
        sequence.addSequence(1500, function(){
            sequence.pause();
            ui.display();
            ui.addEventListener("SelectCorrect" , function(){
                sequence.removeAllSequence();
                sequence.addSequence(1000, function(){
                   dialog.CurrentChar("raio", "Que pena! Você errou!");
                });
                dialog2();
                sequence.start();
             });

            ui.addEventListener("SelectError" , function(){
                sequence.removeAllSequence();
                sequence.addSequence(1500, function(){
                   dialog.CurrentChar("raio", "Parabéns! Você acertou!");
                });
                dialog2();
                sequence.start();
             });
        });
        sequence.start();  
    };
    
    var dialog2 = function(){
           sequence.addSequence(3000, function(){
               dialog.CurrentChar("raio", "quanto mais fumaça");
           });
           sequence.addSequence(3000, function(){
               dialog.CurrentChar("raio", "e jogado no ar");
           });
           sequence.addSequence(3000, function(){
               dialog.CurrentChar("raio", "mais poderá prejudicar o clima da terra");
           });
           sequence.addSequence(3000, function(){
               dialog.CurrentChar("raio", "com o tempo irá afetar");
           });
           sequence.addSequence(3000, function(){
               dialog.CurrentChar("raio", "a qualidade de vida das pessoas!");
           });
           sequence.addSequence(3000, function(){
               dialog.CurrentChar("player", "Então quando eu deixei");
           });
           sequence.addSequence(3000, function(){
               dialog.CurrentChar("player", "os aparelhos ligados,");
           });
           sequence.addSequence(3000, function(){
               dialog.CurrentChar("player", "foi jogado quanta fumaça no ar?");
           });
           sequence.addSequence(3000, function(){
               dialog.CurrentChar("raio", "nesse tempo foi produzida uma quantidade");
           });
           sequence.addSequence(3000, function(){
               dialog.CurrentChar("raio", "pequena de fumaça,");
           });
           sequence.addSequence(3000, function(){
               dialog.CurrentChar("raio", "veja o gráfico:");
           });
           
           sequence.addSequence(3000, function(){
              dialog.setFundoAlpha(0);
              grafico.setDados((0.00006 * 60) * 1000,"5");
              grafico.setDados((0.00006 * 20) * 1000,"2");
              grafico.scale = new iGame.Vector2(0.2,0.2);
              grafico.createGraphics();
              grafico.position = new iGame.Vector2(610, 270);
           });
           
           sequence.addSequence(dialog_timer, function(){
               dialog.CurrentChar("raio", "A pilha grande é quando foi deixado");
           });
           
           sequence.addSequence(dialog_timer, function(){
               dialog.CurrentChar("raio", "os equipamentos ligados enquanto durmia");
           });
           
           sequence.addSequence(dialog_timer, function(){
               dialog.CurrentChar("raio", "O pequeno é se você tivesse desligado!");
           });
           
           sequence.addSequence(dialog_timer, function(){
               dialog.CurrentChar("player", "Entendo!");
           });
           
           sequence.addSequence(dialog_timer, function(){
               dialog.CurrentChar("raio", "Imagina milhões de pessoas");
           });
           
           
           sequence.addSequence(dialog_timer, function(){
               dialog.CurrentChar("raio", "utilizando energia elétrica!");
           });
           
           sequence.addSequence(dialog_timer, function(){
               dialog.CurrentChar("raio", "Imagina quanta fumaça é jogada!");
           });
           
           sequence.addSequence(7000, function(){
              dialog.setFundoAlpha(0.4);
              that.removeChild(grafico);
              dialog.CloseDialog();
              stageT.moveTo({X:-300,Y:0}, 2000);
              stageT.scaleTo({X:1, Y:1}, 2000);
              raio.visible = true;
              stageT.addEventListener("TweenComplete", function(){
                  stage.position = new iGame.Vector2(-300,0);
                  stage.scale = new iGame.Vector2(1,1);
                  dialog.scale = new iGame.Vector2(1,1);
                  dialog.position.Y = 0;
                  stageT.removeLastEvent("TweenComplete");
              });
           });
           
           sequence.addSequence(dialog_timer, function(){
              dialog.CurrentChar("raio", "Não esqueça o que te falei!!");
           });
           
           sequence.addSequence(dialog_timer, function(){
              dialog.CurrentChar("raio", "Até mais!!");
           });
           
           sequence.addSequence(dialog_timer, function(){
              dialog.CurrentChar("player", "Tchauu Raiiim!");
              that.removeChild(raio);
           });
           
           
           sequence.addSequence(dialog_timer, function(){
              dialog.CurrentChar("mae", "Arnald venha meu filho o almoço esta pronto"); 
           });
           
           sequence.addSequence(dialog_timer, function(){
               dialog.CurrentChar("mae", "venha logo pois vai esfriar");
           });
           
           sequence.addSequence(dialog_timer, function(){
               dialog.CurrentChar("palyer", "Ja vou Mãee!");
           });
           
           sequence.addSequence(dialog_timer, function(){
              dialog.CurrentChar("player", "vou desligar a televisao e o video game");
           });
           
           sequence.addSequence(dialog_timer, function(){
              dialog.CloseDialog();
              tween.moveTo({X:950, Y:320}, 2000);
              tween.addEventListener("TweenComplete", function(){
                  movie.visible = false;
                  tween.moveTo({X:1200, Y:320}, 2000);
              });
                  
              player.playAnimation("walk");
           });
           
           sequence.addSequence(4000, function(){
            transition = new iGame.Node();
            var rect = new iGame.Rect({width:800,height:600});
            var text = new iGame.Text({text:"Fim", align:"center", color:"#ffffff", size:40});
            text.position = new iGame.Vector2(200,150);
            transition.addChild(rect);
            transition.addChild(text);
            transition.position.X = stage.position.X * -1;
            that.addChild(transition);
        });
    };
    
    this.generateSequence = function(sequence){
       var actions = xml.getTagName("action");

       for(var i = 0; i < actions.length; i++){
           var timer = parseFloat(actions[i].getAttribute("timer"));

           if(actions[i].getElementsByTagName("obj").length!==0){               
               var obj = actions[i].getElementsByTagName("obj");
               for(var a = 0; a < obj.length; a++){

                   var target = obj[a].getAttribute("target");
                   var scaleT = null;
                   var positionT = null;
                   var position = null;
                   var scale = null;
                   var tween = obj[a].getElementsByTagName("tween");
                   var properties = obj[a].getElementsByTagName("properties");

                   if(tween.length !== 0){
                        if(tween[0].getElementsByTagName("moveX").length !== 0 && tween[0].getElementsByTagName("moveY").length !== 0){
                            console.log(tween[0].getElementsByTagName("moveX")[0].childNodes[0].nodeValue);
                            positionT = new iGame.Vector2(parseFloat(tween[0].getElementsByTagName("moveX")[0].childNodes[0].nodeValue), parseFloat(tween[0].getElementsByTagName("moveY")[0].childNodes[0].nodeValue));
                        }

                        if(tween[0].getElementsByTagName("scaleX").length !== 0 && tween[0].getElementsByTagName("scaleY").length !== 0){
                            scaleT = new iGame.Vector2(parseFloat(tween[0].getElementsByTagName("scaleX")[0].childNodes[0].nodeValue), parseFloat(tween[0].getElementsByTagName("scaleY")[0].childNodes[0].nodeValue));
                        }
                   }
                   
                   if(properties.length !== 0){
                        if(properties[0].getElementsByTagName("positionX").length !== 0 && properties[0].getElementsByTagName("positionY").length !== 0){
                            positionT = new iGame.Vector2(parseFloat(properties[0].getElementsByTagName("positionX")[0].childNodes[0].nodeValue), parseFloat(properties[0].getElementsByTagName("positionY")[0].childNodes[0].nodeValue));
                        }

                        if(properties[0].getElementsByTagName("scaleX").length !== 0 && properties[0].getElementsByTagName("scaleY").length !== 0){
                            scaleT = new iGame.Vector2(parseFloat(properties[0].getElementsByTagName("scaleX")[0].childNodes[0].nodeValue), parseFloat(properties[0].getElementsByTagName("scaleY")[0].childNodes[0].nodeValue));
                        }
                   }

                   var tweentimer = parseFloat(tween[0].getAttribute("timer"));
                   var animacao = obj[a].getElementsByTagName("animacao")[0].childNodes[0].nodeValue;

                   var func = new Function("dialog.CloseDialog();" + 
                   (position !== null ? target + "= new iGame.Vector2(" + position.X +","+ position.Y +");":"") + 
                   (scale !== null ? target + "= new iGame.Vector2(" + scale.X +","+ scale.Y +");":"") + 
                   (positionT !== null ? "animacao.moveTo({X:"+ positionT.X +",Y:"+ positionT.Y +"},"+ tweentimer + ");":"") + 
                   (scaleT ? "animacao.scaleTo({X:"+scaleT.X+",Y:"+scaleT.Y+"},"+ tweentimer + ");":"") + 
                   (animacao ? target +".changeAnimation('"+new String(animacao)+"');":"")); 
           
                   sequence.addSequence(timer, func);
               }

           }else if(actions[i].getElementsByTagName("dialog").length !== 0){
                var timer = parseInt(actions[i].getAttribute("timer"));
                var _dialog = actions[i].getElementsByTagName("dialog");
                var target = _dialog[0].getAttribute("target");
                var fala = _dialog[0].childNodes[0].nodeValue;
                console.log(fala);
                var funcDialog = new Function("_game.dialog.CurrentChar('"+target+"','"+fala+"');");
                sequence.addSequence(timer,funcDialog);

           }else if(actions[i].getElementsByTagName("ui").length!==0){

           }

       }

   };
};
        