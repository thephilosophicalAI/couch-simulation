function Couch(DNA) {
    this.DNA = DNA;
    this.x = 2;
    this.y = 1 / 2;
    this.r = 0;
    this.count = 0;
    this.gold = false;
    this.fitnessFunc = function() {
        let sum = 0;
        for (let d = 1; d < this.DNA.length; d++) {
            sum+=this.DNA[d];
        }
        return sum / (this.DNA.length - 1);
    }
    this.fitness = this.fitnessFunc();
    this.show = function(index) {
        let right = 0.05;
        let down = 0.05;
        let rotate = 0.02;
        let die = false;
        let breed = true;
        fill(0, 255, 0);
        strokeWeight(1);
        stroke(0);
        beginShape();
        let angleDiff = TWO_PI / (this.DNA.length-1);
        for (let d = 1; d < this.DNA.length; d++) {
            let x = this.DNA[d] * cos((angleDiff * d)+this.r) + this.x;
            let y = this.DNA[d] * sin((angleDiff * d)+this.r) + this.y;
            vertex(x * width / 4, y * height / 4);
            if (4 - x <= right) {
                right = 4-x;
            }
            if ((x<3)&&(1-y<=down)) {
                down = 1-y;
            }
            if ((x>4)||(y<0)||(x<3 && y>1)) {
                die = true;
            }
        }
        let d = 1;
        vertex((this.DNA[d] * cos((angleDiff * d)+this.r) + this.x) * width/4, (this.DNA[d] * sin((angleDiff * d)+this.r) + this.y)*width/4);
        endShape();
        this.x+=right;
        this.y+=down;
        if (right + down < .04) {
            this.r+=rotate;
        }
        if (die) {
            couches.splice(index, 1);
        } else if (this.y >= 2) {
            survivors.push(this);
            couches.splice(index, 1);
        }
    }
    this.reset = function() {
        this.x = width / 2;
        this.y = height / 8;
        this.r = 0;
        this.count = 0;
        this.fitness = this.fitnessFunc();
        this.gold = true;
    }
    this.divide = function(partner) {
        let DNA = [];
        for (var d = 0; d < this.DNA.length; d++) {
            let r1 = random(1);
            let r2 = random(1);
            if (r1 < abs(this.DNA[0]) + .05) {
                DNA[d] = this.DNA[d] + random(-.05, .05);
            } else if (r2 < .5) {
                DNA[d] = this.DNA[d];
            } else {
                DNA[d] = partner.DNA[d];
            }
        }
        return new Couch(DNA);
    }
    this.draw = function() {
        fill(150, 200, 150);
        strokeWeight(1);
        stroke(0);
        beginShape();
        let angleDiff = TWO_PI / (this.DNA.length-1);
        for (let d = 1; d < this.DNA.length; d++) {
            let x = this.DNA[d] * (maxWidth/2) * cos(angleDiff * d) + (3 * width / 8);
            let y = this.DNA[d] * (maxWidth/2) * sin(angleDiff * d) + (5 * height / 8);
            vertex(x, y);
        }
        vertex(this.DNA[1] * (maxWidth/2) * cos(angleDiff) + (3 * width / 8), this.DNA[1] * (maxWidth/2) * sin(angleDiff) + (5 * height / 8));
        endShape();
    }
    this.addPoints = function() {
        let DNA = [this.DNA[0]];
        for (let d = 1; d < this.DNA.length - 1; d++) {
            DNA.push(this.DNA[d]);
            DNA.push((this.DNA[d] + this.DNA[d+1]) / 2);
        }
        DNA.push(this.DNA[this.DNA.length -1]);
        DNA.push((this.DNA[this.DNA.length -1] + this.DNA[1]) / 2);
        this.DNA = DNA;
    }
    this.spin= function(index) {
        let high;
        let low;
        let count;
        let angleDiff = TWO_PI / (this.DNA.length-1);
        do {
        high = 0;
        low = 0;
        count++;
        for (let d = 1; d < this.DNA.length; d++) {
            let y = this.DNA[d] * sin((angleDiff * d));
            if (y > high) {
                high = y;
            } else if (y < low) {
                low = y;
            }
        }
        if (high > 1.2 || low < -1.2) {
        this.DNA.splice(1, 0, this.DNA[this.DNA.length-1]);
        this.DNA.splice(this.DNA.length - 1, 1);
        }
        } while ((high > 1.2 || low < -1.2)&&(count < this.DNA.length * 1.1));
        if (count >= this.DNA.length * 1.1) {
            couches.splice(index, 1);
        }
    }
}