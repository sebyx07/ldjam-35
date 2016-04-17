'use strict';

const MAX_HEALTH = 10;
const MOVE_SPEED = 200;

function EnemyCrawler(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'enemy:crawler');

    this.animations.add('move', [0], 1);
    this.animations.add('hit', [1, 2], 10);

    this.anchor.setTo(0.5, 1);
    this.game.physics.enable(this);

    this.reset(x, y);
}

// inherit from Phaser.Sprite
EnemyCrawler.prototype = Object.create(Phaser.Sprite.prototype);
EnemyCrawler.constructor = EnemyCrawler;

EnemyCrawler.prototype.reset = function (x, y) {
    Phaser.Sprite.prototype.reset.call(this, x, y, MAX_HEALTH);
    this.animations.play('move');

    this.body.velocity.x = -MOVE_SPEED;
};

EnemyCrawler.prototype.hit = function(energy) {
    this.damage(energy);
    this.flash();
};

EnemyCrawler.prototype.flash = function () {
    this.animations.play('hit').onComplete.addOnce(function () {
        this.animations.play('move');
    }, this);
};


module.exports = EnemyCrawler;