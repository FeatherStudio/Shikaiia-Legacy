import {BasePlayer} from "../game/player";
import {BaseCardData} from "../database/carddata";
export class BaseCard {
    owner: BasePlayer;
    private _data: BaseCardData;

    constructor(data:BaseCardData){
        this._data = data;
    }

    play(){
        // Init \owner\ here
    }

    static testCardConstruct(){
        let data = new BaseCardData();
        data.attack = 1;
        return new BaseCard(data);
    }

    get type(){
        return this._data.type;
    }

    get cost(){
        return this._data.cost;
    }

    get mana(){
        return this._data.mana;
    }
    get attack(){
        return this._data.attack;
    }

    get defence(){
        return this._data.defence;
    }

    get life(){
        return this._data.life;
    }

    get effects(){
        return this._data.effects;
    }

}
