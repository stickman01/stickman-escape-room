const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#333',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

let player, cursors, door, key, hasKey = false;

const game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'assets/background.png');
  this.load.image('stickman', 'assets/stickman.png');
  this.load.image('key', 'assets/key.png');
  this.load.image('door', 'assets/door.png');
}

function create() {
  this.add.image(400, 300, 'background');

  player = this.physics.add.sprite(100, 500, 'stickman').setScale(0.5);
  key = this.physics.add.staticSprite(600, 500, 'key');
  door = this.physics.add.staticSprite(750, 500, 'door');

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.overlap(player, key, () => {
    key.destroy();
    hasKey = true;
  }, null, this);

  this.physics.add.overlap(player, door, () => {
    if (hasKey) {
      this.add.text(300, 250, "You Escaped!", { fontSize: '32px', fill: '#00ff00' });
      this.scene.pause();
    }
  }, null, this);
}

function update() {
  player.setVelocity(0);

  if (cursors.left.isDown) {
    player.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.setVelocityX(200);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-200);
  } else if (cursors.down.isDown) {
    player.setVelocityY(200);
  }
}
