import { Coordinates } from "./Coordinate";

export module Neighborhood{
    export type universe = {
        wrap: boolean,
        xMin: number,
        yMin: number,
        xMax: number,
        yMax: number
    }
    export class Neighbor {

        private neighborCount:number = 0;
        constructor(
            private location:Coordinates.CoordinateInterface,
            private alive:boolean = false
        ){}
        /*
         * Coordinates.CoordateInterface getLocation
         */;
        public getLocation():Coordinates.CoordinateInterface {
            return this.location;
        }

        /**
         * isAlive
         */
        public isAlive() {
           return this.alive; 
        }

        public count() {
            return this.neighborCount;
        }

        /**
         * addNeighbor
         */
        public addNeighbor() {
            if (this.neighborCount < 8) {
                this.neighborCount = this.neighborCount + 1;
            }
        }
    }
    type offset = {x:number, y:number};
    export class Neighborhood {
        private offsets:offset[] = [
            {x:1, y:0},
            {x:1, y:-1},
            {x:0, y:-1},
            {x:-1, y:-1},
            {x:-1, y:0},
            {x:-1, y:1},
            {x:0, y:1},
            {x:1, y:1},
        ]

        constructor(private neighbor:Neighbor, private universe:universe){}

        /**
         * getCenter
         */
        public getCenter() {
            return this.neighbor;
        }

        private wrap(n:number, max:number, min:number): number|null {
            if (n > max) {
                if (this.universe.wrap) {
                    return min;
                }
                return null;
            }
            if (n < min) {
                if (this.universe.wrap) {
                    return max;
                }
                return null;
            }
            return n;
        }

        private getOffsetCoordinate(offset:offset): Coordinates.CoordinateInterface | null {
            var x: number = this.neighbor.getLocation().getX();
            var y: number = this.neighbor.getLocation().getY();
            var nextX: number|null = this.wrap(x + offset.x, this.universe.xMax, this.universe.xMin);
            var nextY: number|null = this.wrap(y + offset.y, this.universe.yMax, this.universe.yMin);
            if (nextX == null || nextY == null) {
                return null;
            }
            return new Coordinates.Coordinate(nextX, nextY);
        }

        /**
         * getAllNeighbors
         */
        public getAllNeighbors() {
            var neighbors:Neighbor[] = [];
            var index = 0;
            this.offsets.forEach((offset:offset) => {
                var nextCoord:Coordinates.CoordinateInterface|null = this.getOffsetCoordinate(offset);
                if (nextCoord != null) {
                    var nextNeighbor = new Neighbor(nextCoord);
                    neighbors[index] = nextNeighbor;
                }
            })
            return neighbors;
        }
    }
}

export default Neighborhood;