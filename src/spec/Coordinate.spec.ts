import Coordinates from "../Coordinate.js";

describe("Coordinates hold and operate as expected", function() {
    var expectedX:number;
    var expectedY:number = 7;
    it("expects getX to return 1", function() {
        var expectedX = 1;
        var coordinate = new Coordinates.Coordinate(expectedX, expectedY);
        expect(coordinate.getX()).toBe(expectedX);
    });
    it("expects getX to return 3", function() {
        var expectedX = 3;
        var coordinate = new Coordinates.Coordinate(expectedX, expectedY);
        expect(coordinate.getX()).toBe(expectedX);
    });
    it("expects getY to return 7", function() {
        var expectedX = 3;
        var coordinate = new Coordinates.Coordinate(expectedX, expectedY);
        expect(coordinate.getY()).toBe(expectedY);
    });
    it("expects getY to return 5", function() {
        var expectedX = 3;
        expectedY = 5;
        var coordinate = new Coordinates.Coordinate(expectedX, expectedY);
        expect(coordinate.getY()).toBe(expectedY);
    });
    it("expects toString to return '0000300005'", function() {
        var expectedString:string = "0000300005";
        var coordinate = new Coordinates.Coordinate(3, 5);
        expect(coordinate.toString()).toBe(expectedString);
    });
    it("expects toString to return '0000400007'", function() {
        var expectedString:string = "0000400007";
        var coordinate = new Coordinates.Coordinate(4, 7);
        expect(coordinate.toString()).toBe(expectedString);
    });

    it("expects toString to return '0004400037'", function() {
        var expectedString:string = "0004400037";
        var coordinate = new Coordinates.Coordinate(44, 37);
        expect(coordinate.toString()).toBe(expectedString);
    });
    it("expects toString to return '5004450037'", function() {
        var expectedString:string = "5004450037";
        var coordinate = new Coordinates.Coordinate(50044, 50037);
        expect(coordinate.toString()).toBe(expectedString);
    });

  });