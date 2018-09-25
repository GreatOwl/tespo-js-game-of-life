import { Coordinates } from "./Coordinate";

export module Neighborhood{
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
}

export default Neighborhood;