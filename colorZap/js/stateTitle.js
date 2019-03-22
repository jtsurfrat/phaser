var StateTitle={

   preload:function()
    {
      game.load.image('logo','img/title/gameLogo.png');
      game.load.spritesheet('buttons', 'img/ui/buttons.png', 265, 75, 8);

      if(screen.width < 900){
        game.scale.forceOrientation(false, true);
      }
      // game.scale.forceOrientation(false, true);

    },

    create:function()
    {
      this.logo=game.add.sprite(game.world.centerX, 180, "logo");
      this.logo.anchor.set(0.5, 0.5);

      // start button
      this.btnStart=game.add.button(game.world.centerX,game.world.height-150,'buttons',this.startGameHere,this,7,6,7);
      this.btnStart.anchor.set(0.5, 0.5);
      this.setListeners();

    },
    startGameHere(){
      game.state.start("StateMain");
    },

    setListeners:function() {
      if(screen.width < 900 ){
        game.scale.enterIncorrectOrientation.add(this.wrongWay, this);

        game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
      }
    },

    wrongWay:function(){
      document.getElementById('wrongWay').style.display = 'block';
    },

    rightWay:function(){
      console.log('rightWay');
    },

    update:function()
    {

    }

}













































/**/
