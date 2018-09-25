import { Coordinates as coords, Coordinates} from "./Coordinate.js";
import { Utils } from "./Utils.js";

export module CanvasGrid {
    export type GridConfig = {
        universe: string,
        style: string,
        size: number
    }
    
    type GridState = {
        inputCoordinates: Map<String, coords.CoordinateInterface>,
        coordinates: Map<String, coords.CoordinateInterface>,
        universe?: any,//Can't assert in tests basic DOM/document types #internalRage
        canvas?: any,
        document?: Utils.Doc
    }
    
    export class Grid {
        private state: GridState = {
            inputCoordinates: new Map<String, coords.CoordinateInterface>(),
            coordinates: new Map<String, coords.CoordinateInterface>(),
            universe: null,
            canvas: null,
            document: null,
        }
    
        constructor(private config: GridConfig){
            this.state.document = new Utils.Doc()
        }
    
        public setDocument(document:Document): void {
            this.state.document = new Utils.Doc(document);
        }

        private getUniverse(): any {
            if (this.state.universe === null) {
                var localUniverse = this.state.document.id('universe');
                
                if (typeof localUniverse["getContext"] === "function") {
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

        private loadCoordinateType(coordinate: coords.CoordinateInterface): coords.CoordinateInterface {
            if (coordinate instanceof coords.Coordinate) {
                return new coords.NormalizedCoordinate(coordinate, this.getSize());
            }
            return coordinate;
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
            this.updateCanvasCell("fillRect", this.loadCoordinateType(coordinate));
        }
    
        /**
         * name
         */
        public clearCell(coordinate: coords.CoordinateInterface) {
            this.state.coordinates[coordinate.toString()] = null;
            this.updateCanvasCell("clearRect", this.loadCoordinateType(coordinate));
        }
    
        /**
         * isCellAllive
         */
        public isCellAllive(coordinate: coords.CoordinateInterface): boolean {
            return this.state.coordinates[coordinate.toString()] instanceof Coordinates.Coordinate;
        }
    
        public registerEvent(event: string, action: any) {
            this.getUniverse().addEventListener(event, action);
        }
    }
}

export default CanvasGrid;