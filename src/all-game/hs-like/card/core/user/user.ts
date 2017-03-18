import {BasePlayer} from "../game/player";
import {BaseTeam, BaseGame} from "../game/game";
import {BaseDeck} from "../game/battlefield/deck";
export class BaseUser {
    id: number;
    selectedDeck: BaseDeck;

    game: BaseGame;
    private _player: BasePlayer = null;
    team: BaseTeam;

    constructor(id: number){
        // session here
        this.id = id;
    }

    get player(): BasePlayer {
        return this._player === null ? new BasePlayer() : this._player;
    }

    set player(player:BasePlayer){
        this._player = player
    }
}
