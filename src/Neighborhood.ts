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
    export class Neighborhood {
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
            return [
                new Neighbor(new Coordinates.Coordinate(11,17)),
                new Neighbor(new Coordinates.Coordinate(11,16)),
                new Neighbor(new Coordinates.Coordinate(10,16)),
                new Neighbor(new Coordinates.Coordinate(9,16)),
                new Neighbor(new Coordinates.Coordinate(9,17)),
                new Neighbor(new Coordinates.Coordinate(9,18)),
                new Neighbor(new Coordinates.Coordinate(10,18)),
                new Neighbor(new Coordinates.Coordinate(11,18)),
            ];
        }
    }
}

export default Neighborhood;