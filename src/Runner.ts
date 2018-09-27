import { Neighborhood as N} from "./Neighborhood.js";
import { CanvasGrid as C} from "./Grid.js";
import { Scanner as S} from "./Scanner.js";

export module Runner {
    type rule = {name: string, rule: Function};
    var game = {
        original: {
            rules: {
                alive:[
                    {name:"live with fewer than 2 live neighbors dies", rule:(cell:N.Neighbor):N.Neighbor => {
                        if (cell.isAlive()) {
                            if (cell.count() >= 2) {
                                return cell;
                            }
                            return null;
                        }
                        return null;
                    }},
                    {name:"live with more than 3 live neighbors dies", rule:(cell:N.Neighbor):N.Neighbor => {
                        if (cell.isAlive()) {
                            if (cell.count() < 4) {
                                return cell;
                            }
                            return null;
                        }
                        return null;
                    }}
                ],
                dead: [
                    {name:"dead with exactly 3 live neighbors spawns", rule:(cell:N.Neighbor):N.Neighbor => {
                        if (!cell.isAlive()) {
                            if (cell.count() === 3) {
                                cell.zombify();
                                return cell;
                            }
                            return null;
                        }
                        return null;
                    }}
                ]
            }
        }
    }
    export var runOnce = (grid:C.Grid, scanner:S.Scanner, universe:N.universe):Function => {
        return () => {
            var cells:Map<string, N.Neighbor> = new Map(scanner.scan())
            var rules:rule[] = game.original.rules.alive;
            var deadRules:rule[] = game.original.rules.dead;
            grid.clearGrid(universe);
            cells.forEach((cell:N.Neighbor) => {
                var ruleRunner = (rule) => {
                    var tempCell = cell;
                    if (cell !== null) {
                        cell = rule.rule(cell)
                    }
                    if (cell !== null) {
                        grid.drawCell(cell.getLocation());
                    } else {
                        grid.clearCell(tempCell.getLocation());
                    }
                    cell = tempCell;
                }
                rules.forEach(ruleRunner)
                deadRules.forEach(ruleRunner)
            })
            return runOnce(grid, new S.Scanner(grid, universe), universe);
        }
    }
}
export default Runner;