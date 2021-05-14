class Game {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }

    init() {
        this.image = new Image();
        this.image.src = './assets/sprite-sheet.png';
        this.image.onload = () => {
            this.drawBg();
            this.drawFg();
        }


        document.getElementById('start-btn').addEventListener('click', () => {
            document.getElementById('start-menu').style.display = 'none';
            this.loadAssets();
        })

    }

    loadAssets() {
        this.pipeArr = [];
        this.crash = false;
        this.score = 0;
        this.animationCounter = 1;
        this.image = new Image();
        this.image.src = '/assets/sprite-sheet.png';
        this.image.onload = () => {
            this.generatePlayer();
            this.generatePipe();
            this.player1.addEvents();
            this.refershScreen();
        }
    }

    drawBg() {
        let locX = 0;
        let locY = 0;
        let width = 144;
        let height = 256;
        this.ctx.drawImage(this.image, locX, locY, width, height, 0, 0, this.canvas.width, this.canvas.height);
    }

    drawFg() {
        let locX = 292;
        let locY = 0;
        let width = 168;
        let height = 55;
        this.ctx.drawImage(this.image, locX, locY, width, height, 0, this.canvas.height - 106.8, this.canvas.width, 106.8);
    }

    generatePlayer() {
        let x = this.canvas.width / 2 - 60;
        let y = this.canvas.height / 2 - 100;
        let dy = 1;
        this.player1 = new Bird(this.ctx, this.image, x, y, 60, 50, dy);
    }

    generatePipe() {
        let pWidth = 87;
        let pHeight = 429;
        let x = this.canvas.width;
        let yUp = getRandom(107 - pHeight, 310 - pHeight);
        let yDown = yUp + 190 + pHeight;
        let newPipe = new Pipe(this.ctx, this.image, x, yUp, yDown, pWidth, pHeight, 2);
        this.pipeArr.push(newPipe);
    }

    scoremanager() {
        let prevScore = Store.getData();
        if (this.score > prevScore['high-score']) {
            Store.addData(this.score);
        }
    };

    refershScreen() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBg();

        this.player1.updateBird();
        if (this.animationCounter % 10 === 0) {
            if (this.player1.flap > 3) {
                this.player1.flap = 1;
            } else {
                this.player1.flap++;
            }

        };
        this.animationCounter++;
        for (let i = 0; i < this.pipeArr.length; i++) {

            this.pipeArr[i].updatePipe(this.crash);
            if (!this.pipeArr[i].givenScore && this.pipeArr[i].x < this.player1.x - 80) {
                this.pipeArr[i].givenScore = true;
                this.score++;
            }
            if (this.pipeArr[i].collision(this.player1) || this.player1.grounded()) {
                this.crash = true;
                this.player1.crash = true;
                break;
            };
        }
        if (this.canvas.width - (this.pipeArr[this.pipeArr.length - 1].x + this.pipeArr[this.pipeArr.length - 1].width) > 218) {
            this.generatePipe();
        }
        if ((this.pipeArr[0].x + this.pipeArr[0].width) < 0) {
            this.pipeArr.shift()
        }
        this.drawFg();
        if (!this.player1.grounded()) {
            this.animate = window.requestAnimationFrame(this.refershScreen.bind(this));

        } else {
            this.scoremanager();
            let gameOverMsg = document.getElementById('game-over-message');
            gameOverMsg.style.display = 'block';
            document.getElementById('score').innerText = this.score;
            document.getElementById('high-score').innerText = Store.getData()['high-score'];
            document.getElementById('restart-btn').addEventListener('click', () => {
                gameOverMsg.style.display = 'none';
                window.cancelAnimationFrame(this.animate);
                document.getElementById('start-menu').style.display = 'block';
            })
        }
    }
}

