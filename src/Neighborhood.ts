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

        constructor(private neighbor:Neighbor){}

        /**
         * getCenter
         */
        public getCenter() {
            return this.neighbor;
        }

        /**
         * getAllNeighbors
         */
        public getAllNeighbors() {
            var neighbors:Neighbor[] = [];
            var index = 0;
            this.offsets.forEach((offset:offset) => {
                var nextCoord = new Coordinates.Coordinate(
                    this.neighbor.getLocation().getX() + offset.x,
                    this.neighbor.getLocation().getY() + offset.y
                )
                var nextNeighbor = new Neighbor(nextCoord);
                neighbors[index] = nextNeighbor;
            })
            return neighbors;
        }
    }
}

export default Neighborhood;