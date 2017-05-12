export class Cell {
    flag: boolean;
    mine: boolean;
    show: boolean;
    proximity: any;
    row: number;
    column: number;

    constructor(hasMine: boolean,row : number , column: number) {
        this.flag = false;
        this.mine = hasMine;
        this.proximity = 0;
        this.show = false;
        this.row = row;
        this.column = column;
    }

    showCell():void{
        if (!this.flag && !this.mine) this.show=true;
        
    }
}