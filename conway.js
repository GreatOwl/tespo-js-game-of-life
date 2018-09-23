var universe = null;
var conwayCanvas = null;
var gridSize = 10;
var coordinates = {};

var StringUtils = {
    padLeft (padding, padWith, value) {
        var length = value.length;
        var padToAdd = padding - length;
        if (padToAdd > 0) {
            return StringUtils.padLeft(padding, padWith, padWith + value);
        }
        return value;
    }
}

class Coordinate {
    constructor (xValue, yValue) {
        this.x = xValue;
        this.y = yValue;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    toString() {
        return StringUtils.padLeft(5, "0", this.getX()) + StringUtils.padLeft(5, "0", this.getY())
    }
}

class BaseCoordinate extends Coordinate{
    constructor (xValue, yValue) {
        var local = {
            normalizeCoordinate(value) {
                return Math.floor((value - 10)/gridSize);
            }
        }

        super(
            local.normalizeCoordinate(xValue),
            local.normalizeCoordinate(yValue)
        );
    }
}

class NormalizedCoordinate {
    constructor (coordinate) {
        this.coordinate = coordinate;
    }

    getX() {
        return this.coordinate.getX() * gridSize;
    }

    getY() {
        return this.coordinate.getY() * gridSize;
    }
}

function getUniverse() {
    if (universe === null) {
        universe = document.getElementById('universe');
    }
    return universe;
}

function getGrid() {
    if (conwayCanvas === null) {
        conwayCanvas = getUniverse().getContext('2d');
    }
    return conwayCanvas;
}

function drawCell(coordinate) {
    var canvas = getGrid();
    canvas.fillStyle = 'rgb(0, 0, 0)';
    localCoordinate = new NormalizedCoordinate(coordinate);
    canvas.fillRect(
        localCoordinate.getX(),
        localCoordinate.getY(), 
        gridSize, 
        gridSize
    );
}

function activateInput() {
    getUniverse().addEventListener('click', function(click) {
        var coordinate = new BaseCoordinate(click.clientX, click.clientY);
        if (!coordinates[coordinate.toString()]) {
            coordinates[coordinate.toString()] = coordinate;
            drawCell(coordinate);
        }
    });
}

function draw() {
    activateInput();
}