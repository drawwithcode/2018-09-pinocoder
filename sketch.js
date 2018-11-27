var canvas;
var distance;
var mappa = new Mappa('MapboxGL', 'pk.eyJ1IjoiaXJlbmlhIiwiYSI6ImNqb3pwdmtsbTAwOGkzcXJ4aTJxdGZlcWYifQ.gvKt952hRjPX9QkmQ2PJmQ');

// MY HOUSE
var pino = {
    lat: 45.4915425,
    lng: 9.2094814
};

// MAP OPTIONS
var options = {
    lat: 0,
    lng: 0,
    zoom: 12,
    style: 'mapbox://styles/mapbox/dark-v9'
}


// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————


function preload() {
    currentPosition = getCurrentPosition();
}

// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    // REFRESH LATITUDE / LONGITUDE WITH CURRENT POSITION
    options.lat = currentPosition.latitude;
    options.lng = currentPosition.longitude;

    // SET MAP
    map = mappa.tileMap(options);
    map.overlay(canvas);
};


// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————


function draw() {
    clear();
    angleMode(DEGREES);

    // DEFINE POSITIONS
    var pinoHouse = map.latLngToPixel(pino.lat, pino.lng);
    var currentP = map.latLngToPixel(currentPosition.latitude, currentPosition.longitude);

    // SET LINE BETWEEN POINTS
    push()
    strokeWeight(2);
    stroke(255)
    line(pinoHouse.x, pinoHouse.y, currentP.x, currentP.y, -100);
    pop()


    // SET BIG TEXT
    textFont('Karla');

    // SET PINO'S HOUSE POINT
    push()
    fill(74, 116, 255)
    strokeWeight(2)
    stroke(255)
    ellipse(pinoHouse.x, pinoHouse.y, 15);

    // TEXT
    strokeWeight(2)
    stroke(52, 51, 50);
    fill(74, 116, 255)
    textSize(18);
    text('PINO\'S HOUSE', pinoHouse.x + 15, pinoHouse.y + 5);

    pop();

    // SET CURRENT POSITION'S POINT
    push()
    fill(255, 53, 2)
    strokeWeight(2)
    stroke(255)
    ellipse(currentP.x, currentP.y, 30);
    // TEXT
    strokeWeight(2)
    stroke(52, 51, 50);
    fill(255, 53, 2)
    textSize(18);
    text('CURRENT POSITION', currentP.x + 25, currentP.y + 6);
    pop()




    push();
    strokeWeight(5)
    stroke(52, 51, 50);
    fill(255, 53, 2)
    textSize(24);
    text('How long does it take to come and visit me?', 50, 100);
    pop();

    // DISTANCE TEXT
    push();
    strokeWeight(5)
    stroke(52, 51, 50);
    fill(255)
    textSize(48);
    distance = calcGeoDistance(pino.lat, pino.lng, currentPosition.latitude, currentPosition.longitude, 'km')
    distanceRoud = Math.round(distance * 100) / 100;
    text(distanceRoud + 'km', 50, 150);
    pop();



    // VELOCITY TEXT
    push();

    strokeWeight(5)
    stroke(52, 51, 50);
    fill(255)
    textSize(48);
    time = Math.round(distanceRoud / 5 * 60);
    text(time + 'min', 50, 200);
    pop();


    // STEPS TEXT

    push();
    time = distanceRoud / 5 * 60;
    strokeWeight(5)
    stroke(52, 51, 50);
    fill(255)
    textSize(48);
    steps = distanceRoud * 10000;
    text(steps + ' steps', 50, 250);
    pop();
}
