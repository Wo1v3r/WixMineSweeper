import { Board } from './board';

describe('Board Class (Data type)', () => {
    let testBoard = new Board(5, 5, [[1, 1], [2, 2]]);

    it("Should Flatten the cells array correctly", () => {
        expect(testBoard.cellsFlattened.length).toEqual(25);

        testBoard.cellsFlattened.forEach((cell) => {
            //Indicies should match the same cell object:
            expect(cell).toBe(testBoard.cells[cell.row][cell.column]);
        })
    });

    it("Should add mines on creation", () => {
        expect(testBoard.cells[0][0].mine).toBeFalsy();
        expect(testBoard.cells[1][1].mine).toBeTruthy();
        expect(testBoard.cells[2][2].mine).toBeTruthy();
    })

    it("Should hide all cells upon creation", () => {
        testBoard.cellsFlattened.forEach((cell) =>
            expect(cell.show).toBeFalsy());
    })

    it("Should set the proximity correctly upon creation", () => {
        //Proximity from Mine @ 1,1
        expect(testBoard.cells[0][0].proximity).toEqual(1);
        expect(testBoard.cells[0][1].proximity).toEqual(1);
        expect(testBoard.cells[0][2].proximity).toEqual(1);
        expect(testBoard.cells[1][0].proximity).toEqual(1);
        expect(testBoard.cells[2][0].proximity).toEqual(1);

        //Proximity from Mine @ 2,2
        expect(testBoard.cells[1][3].proximity).toEqual(1);
        expect(testBoard.cells[2][3].proximity).toEqual(1);
        expect(testBoard.cells[3][1].proximity).toEqual(1);
        expect(testBoard.cells[3][2].proximity).toEqual(1);
        expect(testBoard.cells[3][3].proximity).toEqual(1);

        //Proximity from both mines @(1,1),(2,2)
        expect(testBoard.cells[1][2].proximity).toEqual(2);
        expect(testBoard.cells[2][1].proximity).toEqual(2);

    })
});