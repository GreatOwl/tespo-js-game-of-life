import Coordinates from "../Coordinate.js";

describe("Base Coordinate is reliable", () => {
    var expectedX:number;
    var expectedY:number = 7;
    it("expects getX to return 1", () => {
        var expectedX = 1;
        var coordinate = new Coordinates.Coordinate(expectedX, expectedY);
        expect(coordinate.getX()).toBe(expectedX);
    });
    it("expects getX to return 3", () => {
        var expectedX = 3;
        var coordinate = new Coordinates.Coordinate(expectedX, expectedY);
        expect(coordinate.getX()).toBe(expectedX);
    });
    it("expects getY to return 7", () => {
        var expectedX = 3;
        var coordinate = new Coordinates.Coordinate(expectedX, expectedY);
        expect(coordinate.getY()).toBe(expectedY);
    });
    it("expects getY to return 5", () => {
        var expectedX = 3;
        expectedY = 5;
        var coordinate = new Coordinates.Coordinate(expectedX, expectedY);
        expect(coordinate.getY()).toBe(expectedY);
    });
    it("expects toString to return '0000300005'", () => {
        var expectedString:string = "0000300005";
        var coordinate = new Coordinates.Coordinate(3, 5);
        expect(coordinate.toString()).toBe(expectedString);
    });
    it("expects toString to return '0000400007'", () => {
        var expectedString:string = "0000400007";
        var coordinate = new Coordinates.Coordinate(4, 7);
        expect(coordinate.toString()).toBe(expectedString);
    });
    it("expects toString to return '0004400037'", () => {
        var expectedString:string = "0004400037";
        var coordinate = new Coordinates.Coordinate(44, 37);
        expect(coordinate.toString()).toBe(expectedString);
    });
    it("expects toString to return '5004450037'", () => {
        var expectedString:string = "5004450037";
        var coordinate = new Coordinates.Coordinate(50044, 50037);
        expect(coordinate.toString()).toBe(expectedString);
    });
    it("expects toString to return truncated string '5004450037'", () => {
        var expectedString:string = "5004450037";
        var coordinate = new Coordinates.Coordinate(550044, 550037);
        expect(coordinate.toString()).toBe(expectedString);//.not(expectedString);
    });
  });
describe("User Coordinate successfully converts to Base Coordinate", () => {
    var calculateUserCoordinateBuilder = (size, cursorFudgeSize):Function => {
        return (expected: number):number => {
            return expected * size + cursorFudgeSize
        }
    }

    var userCoordinateRange:number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var cursorFudgeSize: number = 10;
    var size: number = userCoordinateRange.length;
    var calculateUserCoordinate = calculateUserCoordinateBuilder(size, cursorFudgeSize);
    var testGetYBuilder = (userCoordinateRange:number[]):Function => {
        return (expectedY: number) => {
            var y:number = calculateUserCoordinate(expectedY);
            userCoordinateRange.forEach(offset => {
                var coordinate = new Coordinates.UserCoordinate(10, y + offset, size);
                expect(coordinate.getY()).toBe(expectedY);
            });
        }
    }
    var testGetXBuilder = (userCoordinateRange:number[]):Function => {
        return (expectedX: number) => {
            var x:number = calculateUserCoordinate(expectedX);
            userCoordinateRange.forEach(offset => {
                var coordinate = new Coordinates.UserCoordinate(x + offset, 10, size);
                expect(coordinate.getX()).toBe(expectedX);
            });
        }
    }
    var testGetX = testGetXBuilder(userCoordinateRange);
    var testGetY = testGetYBuilder(userCoordinateRange);
    it("expects getX to return 1", () => {
        testGetX(1);
    })
    it("expects getX to return 3", () => {
        testGetX(3);
    })
    it("expects getY to return 7", () => {
        testGetY(7);
    })
    it("expects getY to return 5", () => {
        testGetY(5);
    })
    var testHash = (expectedX: number, expectedY: number, expectedString:string) => {
        var x:number = calculateUserCoordinate(expectedX);
        var y:number = calculateUserCoordinate(expectedY);
        userCoordinateRange.forEach(offsetX => {
            userCoordinateRange.forEach(offsetY => {
                var coordinate = new Coordinates.UserCoordinate(x + offsetX, y + offsetY, size);
                expect(coordinate.toString()).toBe(expectedString);
            });
        });
    }
    it("expects toString to return '0000300005'", () => {
        testHash(3, 5, "0000300005");
    });
    it("expects toString to return '0000400007'", () => {
        testHash(4, 7, "0000400007");
    });
    it("expects toString to return '0004400037'", () => {
        testHash(44, 37, "0004400037");
    });
    it("expects toString to return '5004450037'", () => {
        testHash(50044, 50037, "5004450037");
    });
    it("expects toString to return truncated string '5004450037'", () => {
        testHash(550044, 550037, "5004450037");
    });
    it("should return correct X and Y even for a smaller GridSize", () => {
        var smallerCoordinates: number[] = [0, 1, 2, 3];
        var testGetX = testGetXBuilder(smallerCoordinates);
        var testGetY = testGetYBuilder(smallerCoordinates);
        testGetX(3);
        testGetX(432);
        testGetY(9);
        testGetY(983);
    })
});
describe("Normalized coordinate adjusts coordinates so things look good to users", () => {
    var gridSize:number = 10;//means 10 pixels
    it("expects getX to return 10", () => {
        var base = new Coordinates.Coordinate(1,2);
        var subject = new Coordinates.NormalizedCoordinate(base, gridSize);
        expect(subject.getX()).toBe(10);
    });
    it("expects getX to return 30", () => {
        var base = new Coordinates.Coordinate(3,2);
        var subject = new Coordinates.NormalizedCoordinate(base, gridSize);
        expect(subject.getX()).toBe(30);
    });
    it("expects getY to return 70", () => {
        var base = new Coordinates.Coordinate(1,7);
        var subject = new Coordinates.NormalizedCoordinate(base, gridSize);
        expect(subject.getY()).toBe(70);
    });
    it("expects getY to return 50", () => {
        var base = new Coordinates.Coordinate(3,5);
        var subject = new Coordinates.NormalizedCoordinate(base, gridSize);
        expect(subject.getY()).toBe(50);
    });
    it("expects toString to return '0000300005'", () => {
        var expectedString:string = "0000300005";
        var coordinate = new Coordinates.Coordinate(3, 5);
        var subject = new Coordinates.NormalizedCoordinate(coordinate, gridSize);
        expect(subject.toString()).toBe(expectedString);
    });
    it("expects toString to return '0000400007'", () => {
        var expectedString:string = "0000400007";
        var coordinate = new Coordinates.Coordinate(4, 7);
        var subject = new Coordinates.NormalizedCoordinate(coordinate, gridSize);
        expect(subject.toString()).toBe(expectedString);
    });
    it("expects toString to return '0004400037'", () => {
        var expectedString:string = "0004400037";
        var coordinate = new Coordinates.Coordinate(44, 37);
        var subject = new Coordinates.NormalizedCoordinate(coordinate, gridSize);
        expect(subject.toString()).toBe(expectedString);
    });
    it("expects toString to return '5004450037'", () => {
        var expectedString:string = "5004450037";
        var coordinate = new Coordinates.Coordinate(50044, 50037);
        var subject = new Coordinates.NormalizedCoordinate(coordinate, gridSize);
        expect(subject.toString()).toBe(expectedString);
    });
    it("expects toString to return truncated string '5004450037'", () => {
        var expectedString:string = "5004450037";
        var coordinate = new Coordinates.Coordinate(550044, 550037);
        var subject = new Coordinates.NormalizedCoordinate(coordinate, gridSize);
        expect(subject.toString()).toBe(expectedString);
    });
});