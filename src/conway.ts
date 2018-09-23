type GridConfig = {
    universe: string,
    style: string,
    size: number
}
type GridState = {
    inputCoordinates: Map<String, CoordinateInterface>,
    coordinates: Map<String, CoordinateInterface>,
    universe?: HTMLCanvasElement,
    canvas?: CanvasRenderingContext2D
}

var StringUtils = {
    padLeft: function(padding, padWith, value): string {
        var length = value.length;
        var padToAdd = padding - length;
        if (padToAdd > 0) {
            return StringUtils.padLeft(padding, padWith, padWith + value);
        }
        return value;
    }
}

interface CoordinateInterface {
    getX(): number;
    getY(): number;
    toString(): string;
}

class Coordinate implements CoordinateInterface{
    constructor (
        private x: number, 
        private y: number
    ) {}

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    toString(): string {
        return StringUtils.padLeft(5, "0", this.getX()) + StringUtils.padLeft(5, "0", this.getY());
    }
}

class UserCoordinate extends Coordinate{
    constructor (xValue: number, yValue: number, size: number) {
        var local = {
            normalizeCoordinate(value) {
                return Math.floor((value - 10)/size);
            }
        }

        super(
            local.normalizeCoordinate(xValue),
            local.normalizeCoordinate(yValue)
        );
    }
}

class NormalizedCoordinate implements CoordinateInterface{
    constructor (private coordinate: CoordinateInterface, private size: number) {}

    getX(): number {
        return this.coordinate.getX() * this.size;
    }

    getY(): number {
        return this.coordinate.getY() * this.size;
    }
}

class Grid {
    private state: GridState = {
        inputCoordinates: new Map<String, CoordinateInterface>(),
        coordinates: new Map<String, CoordinateInterface>(),
        universe: null,
        canvas: null,
    }

    constructor(private config: GridConfig){}

    private getUniverse(): HTMLCanvasElement {
        if (this.state.universe === null) {
            var localUniverse = document.getElementById('universe');
            if (localUniverse instanceof HTMLCanvasElement) {
                this.state.universe = localUniverse;
            }
        }
        return this.state.universe;
    }

    private getGrid(): CanvasRenderingContext2D {
        if (this.state.canvas === null) {
            this.state.canvas = this.getUniverse().getContext('2d');
        }
        this.state.canvas.fillStyle = this.config.style;
        return this.state.canvas;
    }

    private updateCanvasCell(command: string, coord: CoordinateInterface) {
        var canvas: CanvasRenderingContext2D = this.getGrid();
        canvas[command](coord.getX(), coord.getY(), this.config.size, this.config.size);
    }

    /**
     * getSize
     */
    public getSize(): number {
        return this.config.size;
    }
    /**
     * name
     */
    public drawCell(coordinate: CoordinateInterface): void {
        this.state.coordinates[coordinate.toString()] = coordinate;
        this.updateCanvasCell("fillRect", new NormalizedCoordinate(coordinate, this.getSize()));
    }

    /**
     * name
     */
    public clearCell(coordinate: CoordinateInterface) {
        this.state.coordinates[coordinate.toString()] = null;
        this.updateCanvasCell("clearRect", new NormalizedCoordinate(coordinate, this.getSize()));
    }

    /**
     * isCellAllive
     */
    public isCellAllive(coordinate: CoordinateInterface): boolean {
        return this.state.coordinates[coordinate.toString()];
    }

    public registerEvent(event: string, action: any) {
        this.getUniverse().addEventListener(event, action);
    }
}

function activateInput(grid: Grid, config: GridConfig) {
    grid.registerEvent('click', function(click) {
        var coordinate = new UserCoordinate(click.clientX, click.clientY, grid.getSize());
        if (grid.isCellAllive(coordinate)) {
            grid.clearCell(coordinate);
        } else {
            grid.drawCell(coordinate);
        }
    });
}

function draw() {
    var config: GridConfig = {
        universe: "universe",
        style: 'rgb(0, 0, 0)',
        size: 10
    };
    var grid: Grid = new Grid(config);
    activateInput(grid, config);
}