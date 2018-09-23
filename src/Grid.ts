import { Conway as coords} from "./Coordinate.js";

export namespace Conway {
    export type GridConfig = {
        universe: string,
        style: string,
        size: number
    }
    
    type GridState = {
        inputCoordinates: Map<String, coords.CoordinateInterface>,
        coordinates: Map<String, coords.CoordinateInterface>,
        universe?: HTMLCanvasElement,
        canvas?: CanvasRenderingContext2D
    }
    
    export class Grid {
        private state: GridState = {
            inputCoordinates: new Map<String, coords.CoordinateInterface>(),
            coordinates: new Map<String, coords.CoordinateInterface>(),
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
    
        private updateCanvasCell(command: string, coord: coords.CoordinateInterface) {
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
        public drawCell(coordinate: coords.CoordinateInterface): void {
            this.state.coordinates[coordinate.toString()] = coordinate;
            this.updateCanvasCell("fillRect", new coords.NormalizedCoordinate(coordinate, this.getSize()));
        }
    
        /**
         * name
         */
        public clearCell(coordinate: coords.CoordinateInterface) {
            this.state.coordinates[coordinate.toString()] = null;
            this.updateCanvasCell("clearRect", new coords.NormalizedCoordinate(coordinate, this.getSize()));
        }
    
        /**
         * isCellAllive
         */
        public isCellAllive(coordinate: coords.CoordinateInterface): boolean {
            return this.state.coordinates[coordinate.toString()];
        }
    
        public registerEvent(event: string, action: any) {
            this.getUniverse().addEventListener(event, action);
        }
    }
}