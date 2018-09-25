import Grid from "../Grid";
import { Coordinates } from "../Coordinate";

describe("The grid object can manipulate the canvas", () => {
    var size:number = 5;
    var canvasContext:any = jasmine.createSpyObj<CanvasRenderingContext2D>(null, ['useless']);
    var getGrid:Function = ():Grid.Grid => {
        var canvasElement:any = jasmine.createSpyObj<HTMLCanvasElement>(null, ['useless']);
        var document:any = jasmine.createSpyObj<Document>(null, ['useless']);

        document["getElementById"] = () => {
            return canvasElement
        };
        canvasElement["getContext"] = () => {
            return canvasContext;
        }
        canvasContext["fillRect"] = () => {};
        canvasContext["clearRect"] = () => {};
        var config:Grid.GridConfig = {
            universe: "canvaseGrid",
            style: "rgb(0,0,0)",
            size: size
        }
        var grid = new Grid.Grid(config);
        grid.setDocument(document);
        return grid;
    }
    
    it("has a grid size consistent with the configuration", () => {
        expect(getGrid().getSize()).toBe(size); 
    });
    it("returns false when its asked if a cell is allive", () => {
        var grid:Grid.Grid = getGrid();
        expect(grid.isCellAllive(new Coordinates.Coordinate(3,5)))
            .toBe(false);
    })

});