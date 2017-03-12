import {BaseManaColor} from "../card/mana";
export class BaseCardData {
    // DBCard, should not be used, store card data from database
    public type = 0;

    public cost = 0;
    public mana: BaseManaColor[];

    public attack = 0;
    public defence = 0;
    public life = 1;

    public effects: BaseEffect[];
}

