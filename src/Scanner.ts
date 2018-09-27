import { CanvasGrid as G} from "./Grid.js";
import { Neighborhood as N} from "./Neighborhood.js";
import { Coordinates as C} from "./Coordinate.js";

export module Scanner{
    export class Scanner {
        /**
         * constructor
         */
        public constructor(private grid:G.Grid, private universe:N.universe) {}

        /**
         * scan
         */
        public scan():Map<string, N.Neighbor> {
            var scanned:Map<string, N.Neighbor> = new Map<string, N.Neighbor>();
            var cells:Map<string, C.CoordinateInterface> = new Map(this.grid.getLiveCells());
            cells.forEach((coord:C.CoordinateInterface, key:string) => {
                if (!scanned.has(key)) {
                    scanned = scanned.set(key, new N.Neighbor(coord, true));
                }
                var neighbor:N.Neighbor = scanned.get(key);
                var neighborHood:N.Neighborhood = new N.Neighborhood(neighbor, this.universe);
                var neighbors:N.Neighbor[] = neighborHood.getAllNeighbors();
                neighbors.forEach((nearNeighbor:N.Neighbor) => {
                    var locationHash:string = nearNeighbor.toString();
                    if (!scanned.has(locationHash)) {
                        scanned = scanned.set(locationHash, nearNeighbor);
                    }
                    nearNeighbor = scanned.get(locationHash);
                    var isAlive:boolean = this.grid.isCellAllive(nearNeighbor.getLocation());
                    if (isAlive) {
                        if (!nearNeighbor.isAlive()) {
                            nearNeighbor.zombify();
                        }
                    }
                    nearNeighbor.addNeighbor();
                    scanned = scanned.set(locationHash, nearNeighbor);
                });
                scanned = scanned.set(key, neighbor);
            })
            return scanned;
        }
    }
}
export default Scanner;