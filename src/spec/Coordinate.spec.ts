import Coordinates from "../Coordinate.js";

describe("Coordinates hold and operate as expected", function() {
    it("returns the raw coordinates it recievs", function() {
        var expectedX = 4;
        var expectedY = 7;
        var coordinate = new Coordinates.Coordinate(expectedX, expectedY);
        expect(coordinate.getX()).toBe(expectedX);
        expect(coordinate.getY()).toBe(expectedY);
    });
  });