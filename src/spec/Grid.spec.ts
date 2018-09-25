import Grid from "../Grid";
import { Coordinates } from "../Coordinate";

describe("Grid.Grid", () => {
    var size:number = 5;
    var canvasContext:any = jasmine.createSpyObj<CanvasRenderingContext2D>(null, ['useless']);
    var getGrid:Function = (canvasContext):Grid.Grid => {
        var canvasElement:any = jasmine.createSpyObj<HTMLCanvasElement>(null, ['useless']);
        var document:any = jasmine.createSpyObj<Document>(null, ['useless']);

        document["getElementById"] = () => {
            return canvasElement
        };
        canvasElement["getContext"] = () => {
            return canvasContext;
        }
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
        expect(getGrid(canvasContext).getSize()).toBe(size); 
    });
    it("returns false when its asked if a cell is allive", () => {
        var grid:Grid.Grid = getGrid(canvasContext);
        expect(grid.isCellAllive(new Coordinates.Coordinate(3,5)))
            .toBe(false);
    });
    it("returns true when its asked if a cell is allive", () => {
        canvasContext["fillRect"] = () => {};
        var grid:Grid.Grid = getGrid(canvasContext);
        var coordinate:Coordinates.CoordinateInterface = new Coordinates.Coordinate(3,5)
        grid.drawCell(coordinate)
        expect(grid.isCellAllive(coordinate))
            .toBe(true);
    });
    it("fills the requested grid element", () => {
        var coordinate:Coordinates.CoordinateInterface = new Coordinates.Coordinate(3,5)

        canvasContext["fillRect"] = (x, y, xwidth, ywidth) => {
            expect(x).toBe(coordinate.getX()*size);
            expect(y).toBe(coordinate.getY()*size);
            expect(xwidth).toBe(size);
            expect(ywidth).toBe(size);
        }
        
        var grid:Grid.Grid = getGrid(canvasContext);
        grid.drawCell(coordinate)
    });
    it("clears the requested grid element", () => {
        var coordinate:Coordinates.CoordinateInterface = new Coordinates.Coordinate(3,5)

        canvasContext["clearRect"] = (x, y, xwidth, ywidth) => {
            expect(x).toBe(coordinate.getX()*size);
            expect(y).toBe(coordinate.getY()*size);
            expect(xwidth).toBe(size);
            expect(ywidth).toBe(size);
        }
        
        var grid:Grid.Grid = getGrid(canvasContext);
        grid.clearCell(coordinate)
    });
    it("returns map of live cells", () => {
        canvasContext["fillRect"] = () => {};

        var coords: Coordinates.CoordinateInterface[] = [
            new Coordinates.Coordinate(3,5),
            new Coordinates.Coordinate(4,5),
            new Coordinates.Coordinate(3,6),
            new Coordinates.Coordinate(4,6)
        ];
        var grid:Grid.Grid = getGrid(canvasContext);
        coords.forEach((coord: Coordinates.CoordinateInterface) => {
            grid.drawCell(coord);
        })

        var internal:string = "notRun";
        grid.getLiveCells().forEach((coordinate: Coordinates.CoordinateInterface) => {
            var found: Coordinates.CoordinateInterface = coords.find(
                (subject: Coordinates.CoordinateInterface):boolean => {
                    return subject.toString() == coordinate.toString();
                }
            )
            expect(coordinate).toBe(found);
            internal = "run";
        });
        expect(internal).toBe("run");
    })

});