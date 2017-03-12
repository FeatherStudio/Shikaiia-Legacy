import {BasePlayer} from "../game/player";
import {BaseTeam, BaseGame} from "../game/game";
import {BaseDeck} from "../game/battlefield/deck";
export class BaseUser {
    id: number;
    selectedDeck: BaseDeck;

    game: BaseGame;
    player: BasePlayer;
    team: BaseTeam;
}