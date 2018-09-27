import { Coordinates as coords} from "./Coordinate.js";
import { CanvasGrid as grids} from "./Grid.js";
import { Scanner as S } from "./Scanner.js";
import { Runner as R} from "./Runner.js";
import { Neighborhood as N} from "./Neighborhood.js";
import { Utils } from "./Utils.js";

var grid: grids.Grid;
var config: grids.GridConfig = {
    universe: "universe",
    style: 'rgb(0, 0, 0)',
    size: 10
};
var universe:N.universe =  {
    wrap: false,
    xMax: 500/config.size,
    xMin: 0,
    yMax: 300/config.size,
    yMin: 0
};
function activateInput(grid: grids.Grid, config: grids.GridConfig) {
    grid.registerEvent('click', function(click) {
        var coordinate = new coords.UserCoordinate(click.clientX, click.clientY, grid.getSize());
        if (grid.isCellAllive(coordinate)) {
            grid.clearCell(coordinate);
        } else {
            grid.drawCell(coordinate);
        }
    });
}
function deactivateInput(grid: grids.Grid) {
    grid.removeEvent('click');
}
export function draw() {
    grid = new grids.Grid(config);
    activateInput(grid, config);
}
function runStart() {
    deactivateInput(grid)
    var scanner: S.Scanner = new S.Scanner(grid, universe);
    var nextRun:Function = R.runOnce(grid,scanner,universe);
    runRun(nextRun);
}
function runRun(nextRun:Function) {
    var count = 0;
    var op = () => {
        if (getText("run") === "pause"
            && grid.getLiveCells().size > 0
            && count < 100000
        ) {
                count = count + 1;
                nextRun = nextRun();
                setTimeout(op, 100);
        }
    }
    op();
}
function runEnd() {
    activateInput(grid, config);
}
function updateText(id:string, value:string) {
    document.getElementById(id).childNodes[0].nodeValue = value;
}
function getText(id:string) {
    return document.getElementById(id).childNodes[0].nodeValue;
}
export function runToggle() {
    var runButton = document.getElementById("run").childNodes[0].nodeValue;
    if (runButton === "run") {
        updateText("run", "pause");
        runStart();
    } else {
        updateText("run", "run");
        runEnd();
    }
}
export default draw;