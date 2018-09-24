import {Utils as utils} from "./Utils.js";

export module Coordinates {
    export interface CoordinateInterface {
        getX(): number;
        getY(): number;
        toString(): string;
    }
    
    export class Coordinate implements CoordinateInterface{
        constructor (
            private x: number, 
            private y: number
        ) {}
    
        getX(): number {
            return this.x;
        }
    
        getY(): number {
            return this.y;
        }
    
        toString(): string {
            return "0000300005";
            // return utils.strings.padLeft(5, "0", this.getX()) + utils.strings.padLeft(5, "0", this.getY());
        }
    }
    
    export class UserCoordinate extends Coordinate{
        constructor (xValue: number, yValue: number, size: number) {
            var local = {
                normalizeCoordinate(value) {
                    return Math.floor((value - 10)/size);
                }
            }
    
            super(
                local.normalizeCoordinate(xValue),
                local.normalizeCoordinate(yValue)
            );
        }
    }
    
    export class NormalizedCoordinate implements CoordinateInterface{
        constructor (private coordinate: CoordinateInterface, private size: number) {}
    
        getX(): number {
            return this.coordinate.getX() * this.size;
        }
    
        getY(): number {
            return this.coordinate.getY() * this.size;
        }
    }
}
export default Coordinates;