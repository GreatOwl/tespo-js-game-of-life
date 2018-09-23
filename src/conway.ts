import { Conway as coords} from "./Coordinate.js";
import { Conway as grids} from "./Grid.js";

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

export function draw() {
    var config: grids.GridConfig = {
        universe: "universe",
        style: 'rgb(0, 0, 0)',
        size: 10
    };
    var grid: grids.Grid = new grids.Grid(config);
    activateInput(grid, config);
}
export default draw;