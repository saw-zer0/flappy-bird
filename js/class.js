class Bird {
    constructor(ctx, img, x, y, width = 60, height = 50, dy = 1) {
        this.ctx = ctx;
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dy = 2;
        this.crash = false;
        this.flap = 1;
        this.angle = 0;
    }

    moveBird() {
        if (!this.grounded()) {
            this.y += this.dy;
        };

    }

    drawBird() {
        let locX;
        let locY;
        let width = 18;
        let height = 13;
        let x = this.x;
        let y = this.y;
        if (this.flap === 1) {
            locX = 2;
            locY = 490;
        } else if (this.flap === 2) {
            locX = 30;
            locY = 490;
        } else {
            locX = 58;
            locY = 490;
            this.flap = 1;
        }
        this.ctx.drawImage(this.img, locX, locY, width, height, x, y, this.width, this.height);

    }

    updateBird() {
        this.ctx.save();
        this.rotate();
        this.drawBird();
        this.ctx.restore();
        this.moveBird();

        this.gravity();
    }

    gravity() {
        if (this.dy > 15) {
            this.dy = 15
        }
        this.dy += .65;
    }

    jump() {
        if (!this.crash) {
            this.dy = -10.5;
        }
        if (this.y <= -70) {
            this.y = -70;
        }
    }

    grounded() {
        if (this.y + this.height < 712 - 107) {
            return false;
        } else {
            return true;
        }
    }


    addEvents() {
        window.addEventListener('click', (event) => {
            this.jump();
        })

    }

    rotate() {
        this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
        if (this.angle === 45 || this.angle === -90) {
            
        } else if (this.dy < 0) {
            this.angle-=4;
            
        }else if(this.dy > 0){
            this.angle+=4;
        }
        this.ctx.rotate(this.angle * Math.PI / 180);
        this.ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
    }
}

class Pipe {
    constructor(ctx, img, x, yUp, yDown, width, height, dx) {
        this.ctx = ctx;
        this.img = img;
        this.x = x;
        this.yUp = yUp;
        this.yDown = yDown;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.givenScore = false;
    }

    movePipe() {
        this.x -= this.dx;
    }

    drawPipe() {
        let upPipeLocX = 55;
        let downPipeLocX = 84;
        let upPipeLocY = 323;
        let downPipeLocY = 323;
        let width = 28;
        let height = 160;
        this.ctx.drawImage(this.img, upPipeLocX, upPipeLocY, width, height, this.x, this.yUp, this.width, this.height);
        this.ctx.drawImage(this.img, downPipeLocX, downPipeLocY, width, height, this.x, this.yDown, this.width, this.height);
    }

    updatePipe(crash) {
        this.drawPipe();
        if (!crash) {
            this.movePipe();
        }
    }

    collision(bird) {
        let x1 = this.x + 7;
        let y1up = this.yUp + 7;
        let y1down = this.yDown + 9;
        let x2 = bird.x;
        let y2 = bird.y;

        if ((x2 > x1 + this.width || x1 > x2 + bird.width || y2 > y1up + this.height - 14 || y1up > y2 + bird.height) && (x2 > x1 + this.width || x1 > x2 + bird.width || y2 > y1down + this.height || y1down > y2 + bird.height)) {
            return false;
        } else {
            return true;
        }
    }

}

class Ground {

}