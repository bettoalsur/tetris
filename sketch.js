let resx = 250;
let N = 10;
let w = resx/N;

let M = Math.floor(window.innerHeight/w)
let resy = M*w;

let current;
let bloco;

function keyPressed() {
  if (keyCode === UP_ARROW) current.turn();
  else if (keyCode === LEFT_ARROW) {
    if (!current.contactLeft()) current.x-=w;
  } else if (keyCode === RIGHT_ARROW) {
    if (!current.contactRight()) current.x+=w;
  }
}

function setup() {
  createCanvas(resx, resy);
  colorMode(HSB);
  rectMode(CENTER);
  current = new Peca();
  bloco = new Bloco();
}

function draw() {
  
  background(75);
  
  if (keyIsPressed === true) {
    if (keyCode === DOWN_ARROW) {
      if (!current.contactBottom()) current.y+=w;
    } 
  }
  
  update();
  current.show();
  bloco.checkFilledRows();
  bloco.show();
}

function update() {
    
  if(frameCount%15==0) {

    if ( !current.contactBottom() ) current.y+=w;
    else {
      bloco.addPeca(current);
      current = new Peca(); 
    }
  }
}