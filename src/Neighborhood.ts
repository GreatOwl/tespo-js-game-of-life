import { Coordinates } from "./Coordinate";

export module Neighborhood{
    export class Neighbor {

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
            return 0;
        }
    }
}

export default Neighborhood;