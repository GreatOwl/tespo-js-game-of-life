import { Neighborhood as N } from "../Neighborhood.js";
import { Coordinates as C } from "../Coordinate.js";

describe("N.Neighbor", () => {
    var expected = new C.Coordinate(4,9);
    it(" can tell you its located at 3,3", () => {
        var expected = new C.Coordinate(3,3);
        var neighbor:N.Neighbor = new N.Neighbor(expected);
        expect(neighbor.getLocation().toString()).toBe(expected.toString());
    });
    it(" can tell you its located at 4,9", () => {
        var neighbor:N.Neighbor = new N.Neighbor(expected);
        expect(neighbor.getLocation().toString()).toBe(expected.toString());
    });
    it("is dead",() => {
        var neighbor:N.Neighbor = new N.Neighbor(expected);
        expect(neighbor.isAlive()).toBe(false);
    });
    it("is alive",() => {
        var neighbor:N.Neighbor = new N.Neighbor(expected, true);
        expect(neighbor.isAlive()).toBe(true);
    });
    it("knows it has no known living neighbors", () => {
        var neighbor:N.Neighbor = new N.Neighbor(expected, true);
        expect(neighbor.count()).toBe(0);
    });
    it("knows it has a known living neighbors", () => {
        var neighbor:N.Neighbor = new N.Neighbor(expected, true);
        neighbor.addNeighbor();
        expect(neighbor.count()).toBe(1);
    });
    it("can't have more than 8 neighbors", () => {
        var neighbor:N.Neighbor = new N.Neighbor(expected, true);
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
describe("N.Neighborhood", () =>{
    it("has a central neighbor at (8,7)", () => {
        var neighbor: N.Neighbor = new N.Neighbor(new C.Coordinate(8,7), true);
        var neighborhood: N.Neighborhood = new N.Neighborhood(neighbor);
        expect(neighborhood.getCenter().getLocation().toString())
            .toBe(neighbor.getLocation().toString())
    });
    it("has a central neighbor at (10,17)", () => {
        var neighbor: N.Neighbor = new N.Neighbor(new C.Coordinate(10,17), true);
        var neighborhood: N.Neighborhood = new N.Neighborhood(neighbor);
        expect(neighborhood.getCenter().getLocation().toString())
            .toBe(neighbor.getLocation().toString())
    });
    it("knows all neighbors in the neigborhood", () => {
        var neighbor: N.Neighbor = new N.Neighbor(new C.Coordinate(10,17), true);
        var neighborhood: N.Neighborhood = new N.Neighborhood(neighbor);
        var expected:N.Neighbor[] = [
            new N.Neighbor(new C.Coordinate(11,17)),
            new N.Neighbor(new C.Coordinate(11,16)),
            new N.Neighbor(new C.Coordinate(10,16)),
            new N.Neighbor(new C.Coordinate(9,16)),
            new N.Neighbor(new C.Coordinate(9,17)),
            new N.Neighbor(new C.Coordinate(9,18)),
            new N.Neighbor(new C.Coordinate(10,18)),
            new N.Neighbor(new C.Coordinate(11,18)),
        ]
        var internal = "notRun";
        neighborhood.getAllNeighbors().forEach((element:N.Neighbor) => {
            var found = expected.find((expectedNeighbor:N.Neighbor) => {
                if (expectedNeighbor.getLocation().toString() == element.getLocation().toString()) {
                    return true;
                }
                return false;
            })
            expect(found.getLocation().toString()).toBe(element.getLocation().toString());
            internal = "run";
        });
        expect(internal).toBe("run");
    });
});