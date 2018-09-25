import { Coordinates } from "./Coordinate";

export module Neighborhood{
    export class Neighbor {

        constructor(private location:Coordinates.CoordinateInterface){}
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
           return false; 
        }
    }
}

export default Neighborhood;