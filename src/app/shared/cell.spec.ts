import { Cell } from './cell';

describe('Cell Class (Data type)',()=>{
    it ("Should not show cell if it is flagged",()=>{
        let cell = new Cell(false,0,0);
        expect(cell.show).toBeFalsy();
        cell.flag = true;
        cell.showCell();
        expect(cell.show).toBeFalsy();

    });

    it("Should not show cell if it has a mine (All mines are showed at once",()=>{
        let cell = new Cell(true,0,0);
        expect(cell.mine).toBeTruthy();
        cell.showCell();
        expect(cell.show).toBeFalsy();
    })
});