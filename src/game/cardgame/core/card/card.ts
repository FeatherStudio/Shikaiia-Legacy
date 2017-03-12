import {BasePlayer} from "../game/player";
import {BaseCardData} from "../database/carddata";
export class BaseCard extends BaseCardData{
    owner: BasePlayer;

    play(){

    }
}
