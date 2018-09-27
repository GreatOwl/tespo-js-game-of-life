import { Coordinates as coords, Coordinates} from "./Coordinate.js";
import { Utils } from "./Utils.js";
import { Neighborhood } from "./Neighborhood.js";

export module CanvasGrid {
    export type GridConfig = {
        universe: string,
        style: string,
        size: number
    }
    
    type GridState = {
        inputCoordinates: Map<string, coords.CoordinateInterface>,
        coordinates: Map<string, coords.CoordinateInterface>,
        universe?: any,//Can't assert in tests basic DOM/document types #internalRage
        canvas?: any,
        document?: Utils.Doc
    }
    
    export class Grid {
        private state: GridState = {
            inputCoordinates: new Map<string, coords.CoordinateInterface>(),
            coordinates: new Map<string, coords.CoordinateInterface>(),
            universe: null,
            canvas: null,
            document: null,
        }

        private events: Map<string, Function> = new Map<string, Function>();
    
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
    
        public getGrid(): CanvasRenderingContext2D {
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
            this.state.coordinates.set(coordinate.toString(), coordinate);
            console.log("add(" + coordinate.toString() + ")")
            this.updateCanvasCell("fillRect", this.loadCoordinateType(coordinate));
        }
    
        /**
         * name
         */
        public clearCell(coordinate: coords.CoordinateInterface) {
            this.state.coordinates.delete(coordinate.toString());
            console.log("del(" + coordinate.toString() + ")")
            this.updateCanvasCell("clearRect", this.loadCoordinateType(coordinate));
        }

        /**
         * clearGrid
         */
        public clearGrid(universe:Neighborhood.universe) {
            this.getGrid().clearRect(
                universe.xMin,
                universe.yMin,
                universe.xMax * this.config.size,
                universe.yMax * this.config.size
                );
            this.state.coordinates = new Map<string, coords.CoordinateInterface>();
        }
    
        /**
         * isCellAllive
         */
        public isCellAllive(coordinate: coords.CoordinateInterface): boolean {
            if (this.state.coordinates.has(coordinate.toString())) {
                return true;
            }
            return false;
        }
    
        public registerEvent(event: string, action: any) {
            this.events.set(event, action);
            this.getUniverse().addEventListener(event, action);
        }

        public removeEvent(event: string) {
            var action:Function = this.events.get(event);
            this.getUniverse().removeEventListener(event, action);
        }

        /**
         * getLiveCells
         */
        public getLiveCells(): Map<string, Coordinates.CoordinateInterface> {
            // console.log(this.state.coordinates);
            // this.state.coordinates.forEach((coord) => {
            //     console.log(coord);
            // })

            return this.state.coordinates;
        }
    }
}

export default CanvasGrid;