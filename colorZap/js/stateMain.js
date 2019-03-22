var StateMain={

   preload:function()
    {
      // load images into library
      game.load.image("red", "img/main/blocks/red.png");
      game.load.image("blue", "img/main/blocks/blue.png");
      game.load.image("yellow", "img/main/blocks/yellow.png");
      game.load.image("green", "img/main/blocks/green.png");

      game.load.spritesheet("rings", "img/main/rings.png",60,65,5);
      // game.load.spritesheet('ref_name', 'pathto.png', sprite_width, sprite_height, number_of_cells)
      // game.load.spritesheet('ref_name', 'pathto.png', sprite_width, sprite_height, number_of_cells)
      game.load.spritesheet("balls", "img/main/balls.png", 35, 35, 5);
      game.load.spritesheet("soundButtons", "img/ui/soundButtons.png",32,32,2);

      game.load.audio('points', 'sounds/points.mp3');
      game.load.audio('gameOver', 'sounds/gameOver.mp3');

    },

    create:function() {
      this.speed=200;
      this.incSpeed=20;
      this.maxSpeed=500;
      score=0;
      game.physics.startSystem(Phaser.Physics.Arcade);

      this.pointSound=game.add.audio('points');
      this.gameOverSound=game.add.audio('gameOver');

      var red = game.add.image(0,0, "red");
      var blue = game.add.image(0, 100, "blue");
      var green = game.add.image(100, 0, "green");
      var yellow = game.add.image(100, 100, "yellow");

      //click on red blue
      red.inputEnabled=true;
      red.name="red";

      blue.inputEnabled=true;
      blue.name="blue";

      green.inputEnabled=true;
      green.name="green";

      yellow.inputEnabled=true;
      yellow.name="yellow";

      red.events.onInputDown.add(this.changeColor,this);
      blue.events.onInputDown.add(this.changeColor,this);
      green.events.onInputDown.add(this.changeColor,this);
      yellow.events.onInputDown.add(this.changeColor,this);


      this.blockGroup=game.add.group();
      this.blockGroup.add(red);
      this.blockGroup.add(blue);
      this.blockGroup.add(green);
      this.blockGroup.add(yellow);

      this.blockGroup.x=game.world.centerX-this.blockGroup.width/2;
      this.blockGroup.y=game.height-250;
      //set up objects, variables
      //sounds, text

      this.ring=game.add.image(game.world.centerX,this.blockGroup.y-100, "rings");
      this.ring.anchor.set(0.5,0.5);

      this.ball=game.add.sprite(0,0,"balls");
      this.ball.anchor.set(0.5,0.5);
      game.physics.arcade.enable(this.ball);

      //Score Text
      this.scoreText=game.add.text(game.world.centerX,150,"0");
      this.scoreText.fill="#ffffff";
      this.scoreText.fontSize=64;
      this.scoreText.anchor.set(0.5,0.5);
      this.scoreLabel=game.add.text(game.world.centerX,100,"Score:");
      this.scoreLabel.fontSize=32;
      this.scoreLabel.fill="#ffffff";
      this.scoreLabel.anchor.set(0.5,0.5);

      this.soundButton=game.add.image(20,20,"soundButtons");
      this.soundButton.inputEnabled=true;
      if(soundOn==true){
        this.soundButton.frame=0;
      } else {
        this.soundButton.frame=1;
      }

      this.setListeners();
      this.resetBall();
    },

    setListeners:function(){
      // game.input.onUp.add(functionName, this);
      game.input.onUp.add(this.resetRing, this);
      this.soundButton.events.onInputDown.add(this.toggleSound,this);
    },

    toggleSound:function(){
      soundOn=!soundOn;
      if(soundOn==true){
        this.soundButton.frame=0;
      } else {
        this.soundButton.frame=1;
      }
    },

    resetBall:function(){
      var color=game.rnd.integerInRange(0,5);
      var xx=game.rnd.integerInRange(0, game.world.width);
      var yy=game.rnd.integerInRange(0,100);

      this.ball.frame=color;
      this.ball.x=xx;
      this.ball.y=yy;
      //physics
      // this.ball.body.velocity.setTo(0,100);
      var rot=game.physics.arcade.moveToXY(this.ball,this.ring.x,this.ring.y, this.speed);
      this.ball.rotation=rot;

      // increase speed;
      this.speed+=this.incSpeed;
      if(this.speed>this.maxSpeed){
        this.speed=this.maxSpeed;
      }
    },

    changeColor:function(target) {
      console.log(target.name);
      // 0=white 1=blue 2=green 3=red 4=yellow

      switch(target.name){
        case "red":
          this.ring.frame=3;
          break;
        case "blue":
          this.ring.frame=1;
          break;
        case "green":
          this.ring.frame=2;
          break;
        case "yellow":
          this.ring.frame=4;
          break;
      }
    },

    resetRing:function(){
      this.ring.frame=0;
    },

    update:function() {
      var diffX=Math.abs(this.ring.x-this.ball.x);
      var diffY=Math.abs(this.ring.y-this.ball.y);
      // constant running loop

      if(diffX<10 && diffY<10) {
        this.ball.body.velocity.setTo(0,0);

        if(this.ball.frame==this.ring.frame){
          this.resetBall();
          score++;
          this.scoreText.text=score;
          if(soundOn==true){
            this.pointSound.play();
          }

        } else {
          if(soundOn==true){
            this.gameOverSound.play();
          }

          game.state.start("StateOver");
        }
      }
    }

}


































/* */
