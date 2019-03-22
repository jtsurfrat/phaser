var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

var spacefield
var backgroundv;
var player;

var cursor;

var bullets;
var bulletTime = 0;
var fireButton;
var enemies
var score = 0;
var scoreText;
var winText;
var timeLeft;

var mainState = {

  preload:function(){
    game.load.image('starfield', 'assets/starfield.jpg');
    // game.load.image('player', 'assets/Ship/Spritesheet_64x29.png', 64, 29);
    game.load.image('player', 'assets/Ship/f1.png');
    game.load.image('bullet', 'assets/Ship/bullet.png');
    game.load.image('enemy', 'assets/Enemy/Enemy.png');

  },

  create:function(){
    spacefield = game.add.tileSprite(0,0, 800, 600, 'starfield');
    backgroundv = 5;

    player = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    // var fly = player.animations.add('fly');
    // player.animations.play('fly', 30, true);

    cursor = game.input.keyboard.createCursorKeys();
    bullets = game.add.group();

    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.x', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);



    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;

    createEnemies();

    scoreText = game.add.text(0, 550, 'Score:', {font: '32px Arial', fill : '#fff'});
    winText = game.add.text(game.world.centerX,game.world.centerY, "You Win", {font: '32px Arial', fill : '#fff'});
    winText.visible = false;
  },

  update:function(){
    game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);
    spacefield.tilePosition.y += backgroundv;

    if(cursor.left.isDown){
      player.body.velocity.x = -350;
    } else if (cursor.right.isDown) {
      player.body.velocity.x = 350;
    } else {
      player.body.velocity.x = 0;
    }

    if(fireButton.isDown){
      fireBullet();
    }
    scoreText.text = 'Score:' + score;

    if(score === 4000){
      winText.visible = true;
      scoreText.visible = false;
    }
  }

}

function fireBullet(){
  if(game.time.now > bulletTime){
    bullet = bullets.getFirstExists(false);
    if(bullet){
      bullet.reset(player.x + 22,player.y);
      bullet.body.velocity.y = -400;
      bulletTime = game.time.now + 200;
    }
  }
}

function createEnemies(){
  for(var y = 0; y < 4; y ++){
    for(var x = 0; x < 10; x++){
      var enemy = enemies.create(x*48, y*50,'enemy');
      enemy.anchor.setTo(0.5, 0.5);
    }
  }
  enemies.x = 100;
  enemies.y = 50;

  var tween = game.add.tween(enemies).to({x:200}, 2000, Phaser.Easing.Linear.None,true, 0, 1000,true);
  tween.onLoop.add(desend,this);
}

function desend(){
  enemies.y += 10;
}

function collisionHandler(bullet, enemy){
  bullet.kill();
  enemy.kill();

  score += 100;
}

game.state.add('mainState', mainState);

game.state.start('mainState');




































/*











*/
