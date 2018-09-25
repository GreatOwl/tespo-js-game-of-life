import Neighborhood from "../Neighborhood.js";
import { Coordinates } from "../Coordinate.js";

describe("Neighborhood.Neighbor", () => {
    it(" can tell you its located at 3,3", () => {
        var expected = new Coordinates.Coordinate(3,3);
        var neighbor:Neighborhood.Neighbor = new Neighborhood.Neighbor(expected);
        expect(neighbor.getLocation().toString()).toBe(expected.toString());
    });
    it(" can tell you its located at 4,9", () => {
        var expected = new Coordinates.Coordinate(4,9);
        var neighbor:Neighborhood.Neighbor = new Neighborhood.Neighbor(expected);
        expect(neighbor.getLocation().toString()).toBe(expected.toString());
    });
});