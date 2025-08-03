let scoreText = 0;
let score = 0;

class GameScene extends Phaser.Scene{
    preload(){
        resize();
        addEventListener('resize', resize);
        this.load.image('fondo', 'assets/fondo.jpg');

        //загрузка врагов
        this.load.spritesheet('target', 'assets/target.png', {
            frameWidth: 54,
            frameHeight: 69
        });
        this.load.spritesheet('stars', 'assets/stars.png', {
            frameWidth: 50,
            frameHeight: 50
        })
    }
    create(){
        this.add.sprite(180, 384, 'fondo');

        this.animacionesDeLaEscena();
        this.createSprite();

        this.anims.create({
        key: 'stars',
        frames: this.anims.generateFrameNumbers('target', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
    })

    //счет собранных звезд
                scoreText = this.add.text(16, 16, 'Score: 0', {
                    fontSize: '32px',
                    fill: '#000',
                });

                
    }
    update(){

    }
    animacionesDeLaEscena() {
    this.anims.create({
        key: 'Right',
        frames: this.anims.generateFrameNumbers('target', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
    });
    
}

createSprite(numbreSprite = 'target') {
    const y = Math.random() * this.sys.game.config.height;
    const x = Math.random() > 0.5 ? 360 : 0;
    const sentidoVelocidad = x === 0 ? 1 : -1;
    const obj = this.physics.add.sprite(x, y, numbreSprite).setInteractive();
    if (numbreSprite === 'target') {
        obj.play('Right');
    }
    obj.setVelocity(80 * sentidoVelocidad, 0);

    // Создавать новые цели через интервал
    this.time.delayedCall(1500, () => {
        this.createSprite(numbreSprite);
    }, [], this);

    //направление целей
    if(sentidoVelocidad == -1){
        obj.flipX = true;
    }

    //реакция на нажатие
    obj.on('pointerdown', () => this.misilPulsado(obj));    
    }
    misilPulsado(m){
        m.destroy()
        // m.play('stars')
        this.collectPoint();
    }
    collectPoint(){
        score += 1;
        scoreText.setText(`Score: ${score}`)
    }
}




let config = {
            type: Phaser.AUTO,
            width: 360,
            height: 768,
            scene: new GameScene(),
            physics:{
                default: 'arcade',
                // arcade: {
                //     debug: true,
                //     gravity:{
                //         y: 100
                //     }
                // }
            }
            // scene: [Escena],
        }
        let game = new Phaser.Game(config);

        function resize(){
    const canvas = document.querySelector('canvas');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    canvas.style.width = windowWidth + 'px';
    canvas.style.height = windowHeight + 'px';
}