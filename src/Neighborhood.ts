import { Coordinates } from "./Coordinate";

export module Neighborhood{
    export class Neighbor {

        /*
         * Coordinates.Coordate getLocation
         */;
        public getLocation():Coordinates.Coordinate {
            return new Coordinates.Coordinate(3,3);
        }
    }
}

export default Neighborhood;