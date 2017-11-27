let couches = [];
let survivors = [];
let bestHMTl;
let bestDNAHTML;
let couchesHTML;
let bestCouch;
let bestDNA;
let maxWidth;
let numOfCouches;
let pBest;
let count;
let needToDouble;
let exempt;
let difference;

function setup() {
    createCanvas(400, 400);
    let points = 11;
    numOfCouches = 499;
    maxWidth = 1/4 * height;
    for (let i = 0; i < numOfCouches; i++) {
        let DNA = [.1];
        for (let j = 1; j < points + 1; j++) {
            DNA[j] = random(.25, .45);
        }
        couches[i] = new Couch(DNA);
    }
    /* for (let i = 0; i < 101; i++) {
        couches.push(new Couch([-0.0254386515822402, 1.4579322000330215, 1.2710097264524625, 1.1386306913667823, 0.9935274522964425, 0.6656756857188606, 0.6107519941538148, 0.6306312380134247, 0.6748062612742739, 0.9666833793784081, 1.0791998342056408, 1.1712350057474659, 1.3053411009602458, 1.5050734427704155, 1.8059406655932022, 2.3415335393001357, 2.239383267308133, 2.0679184207773518, 1.9060987846259563, 1.7331889576746569, 1.6174876987753817, 1.4886829569556308, 1.3612552039889052, 1.266185493452226, 1.1695139761622064, 1.0745340059847468, 1.0008911045395772, 0.9516229890242991, 0.9252305937468914, 0.9194113527881645, 0.9288238344679679, 0.9604084196448317, 1.0141031647759509, 1.1080469654036613, 1.2178626896300524, 1.340999995409907, 1.4626696027680595, 1.6014331245848055, 1.7106665557388765, 1.877798013091137, 2.0536941617101125, 2.222150519845999, 2.327035564460136, 2.460299249714162, 1.75157398330922]));
    } */
    bestHTML = createP(" ");
    createP(" ");
    couchesHTML = createP(couches.length);
    bestDNAHTML = createP(" ");
    bestCouch = couches[floor(random(couches.length))];
    pBest = 0;
    count = 0;
    difference = 0;
    needToDouble = false;
}

function draw() {
    drawBackground();
    for (let i = couches.length - 1; i >= 0; i--) {
        couches[i].show(i);
    }
    if (couches.length == 0) {
        divide();
    }
}


function divide() {
    let matingPool = [];
    let best = 0;
    let worst = maxWidth;
    for (let i = 0; i < survivors.length; i++) {
        if (survivors[i].fitness > best) {
            best = survivors[i].fitness;
            bestDNA = survivors[i].DNA;
            bestCouch = survivors[i];
        }
        if (survivors[i].fitness < worst) {
            worst = survivors[i].fitness;
        }
    }
    bestHTML.html(best);
    bestDNAHTML.html(bestCouch.DNA);
    if (best <= pBest) {
        count++;
    } else {
        count = 0;
        pBest = best;
    }
    if ((count > 65 && bestCouch.DNA.length <= 22)||(needToDouble)) {
        console.log("best");
        doublePoints();
    }
    worst = pow(worst + 1, 10);
    best = pow(best + 1, 10);
    difference = best - worst;
    for (let j = 0; j < survivors.length; j++) {
        for (let i = 0; i < map(pow(survivors[j].fitness, 10), worst - 1, best, 0, 50); i++) {
            matingPool.push(survivors[j]);
        }
    }
    for (let i = 0; i < numOfCouches; i++) {
        couches.push(matingPool[floor(random(matingPool.length))].divide(matingPool[floor(random(matingPool.length))]));
    }
    bestCouch.reset();
    couches.push(bestCouch);
    survivors.splice(0, survivors.length);
    /*for (let i = 0; i < couches.length; couches++) {
        couches[i].spin(i);
    } */
}

function doublePoints() {
    createP("adding points: " + bestCouch.DNA.length * 2);
    needToDouble = false;
    for (let i = 0; i < survivors.length; i++) {
        survivors[i].addPoints();
    }
    count = 0;
}
function drawBackground() {
    background(0, 0, 255);
    bestCouch.draw();
    strokeWeight(10);
    stroke(255, 50, 50);
    line(0,0,width,2);
    line(width-2,0,width-2,height);
    line(0, height / 4,width - (height/4), height / 4);
    line( 3 * width / 4, height / 4, 3 * width / 4, height);
    couchesHTML.html(couches.length);
}

function raiseMutationRate(mRate) {
    for (let i = 0; i < couches.length; i++) {
        couches[i].DNA[0] = mRate;
    }
    return "done";
}

function mousePressed() {
    console.log(bestDNA);
}