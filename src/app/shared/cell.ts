export class Cell {
    flag: boolean;
    mine: boolean;
    show: boolean;
    proximity: any;

    constructor(hasMine: boolean) {
        this.flag = false;
        this.mine = hasMine;
        this.proximity = 0;
        this.show = false;
    }
}