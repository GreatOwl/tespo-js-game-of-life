import Neighborhood from "../Neighborhood.js";
import { Coordinates } from "../Coordinate.js";

describe("Neighborhood.Neighbor", () => {
    var expected = new Coordinates.Coordinate(4,9);
    it(" can tell you its located at 3,3", () => {
        var expected = new Coordinates.Coordinate(3,3);
        var neighbor:Neighborhood.Neighbor = new Neighborhood.Neighbor(expected);
        expect(neighbor.getLocation().toString()).toBe(expected.toString());
    });
    it(" can tell you its located at 4,9", () => {
        var neighbor:Neighborhood.Neighbor = new Neighborhood.Neighbor(expected);
        expect(neighbor.getLocation().toString()).toBe(expected.toString());
    });
    it("is dead",() => {
        var neighbor:Neighborhood.Neighbor = new Neighborhood.Neighbor(expected);
        expect(neighbor.isAlive()).toBe(false);
    });
    it("is alive",() => {
        var neighbor:Neighborhood.Neighbor = new Neighborhood.Neighbor(expected, true);
        expect(neighbor.isAlive()).toBe(true);
    });
    it("knows it has no known living neighbors", () => {
        var neighbor:Neighborhood.Neighbor = new Neighborhood.Neighbor(expected, true);
        expect(neighbor.count()).toBe(0);
    });
    it("knows it has a known living neighbors", () => {
        var neighbor:Neighborhood.Neighbor = new Neighborhood.Neighbor(expected, true);
        neighbor.addNeighbor();
        expect(neighbor.count()).toBe(1);
    });
    it("can't have more than 8 neighbors", () => {
        var neighbor:Neighborhood.Neighbor = new Neighborhood.Neighbor(expected, true);
        neighbor.addNeighbor();
        neighbor.addNeighbor();
        neighbor.addNeighbor();
        neighbor.addNeighbor();
        neighbor.addNeighbor();
        neighbor.addNeighbor();
        neighbor.addNeighbor();
        neighbor.addNeighbor();
        neighbor.addNeighbor();//9th suggested neighbor
        expect(neighbor.count()).toBe(8);
    });
});