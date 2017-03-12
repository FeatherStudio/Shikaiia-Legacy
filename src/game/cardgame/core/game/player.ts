import {BaseUser} from "../user/user";
import {BaseCard} from "../card/card"
import {BaseDeck} from "./battlefield/deck";
import {BaseOptions} from "../database/config";
import {BaseSlot} from "./battlefield/slot";

export class BasePlayer {
    deck: BaseDeck;
    hand: BaseCard[];
    slot = new BaseSlot();
    order: number;
    user: BaseUser;

    life = BaseOptions.playerLife;
    armor = 0;
    strength = 0;

    selfTurn = false;
    nextGen: IterableIterator<any>;

    constructor(deck: BaseDeck) {
        this.deck = deck;
        this.deck.shuffle();
    }

    draw(count: number) {
        this.hand = this.hand.concat(this.deck.drawCard(count));
    }

    *operate() {
        // TODO Operate means all operates player can use.
        // Such as "select card and then select target", "select card and use it directly",
        // "select unit and select target"
        // \use\ and \bite\ use for test first.
        this.operateResult();
    }

    get team() {
        return this.user.team;
    }

    get game() {
        return this.user.game;
    }

    operateResult() {
        this.game.validate();
    }

    end() {

    }

    *use(index: number) {
        let target = this.hand[index];
        // todo only implement summon here
        let targetPosition = yield;
        this.slot.battlefield.add(target, targetPosition);
    }

    *attack(index: number) {
        let creature: BaseCard = this.slot.battlefield.at(index);
        //todo yield to get target
        // todo interface here instead \BasePlayer\
        let target: BasePlayer = yield;
        target.life -= creature.attack;

        this.operateResult();
    }

    turn(nextGen: IterableIterator<any>) {
        this.selfTurn = true;
        this.nextGen = nextGen;
    }

    endTurn() {
        this.selfTurn = false;
        this.nextGen.next();
    }
}
