class BasePlayer {
    deck: BaseDeck;
    hand: BaseCard[];
    slot = new BaseSlot();
    order: number;

    life = BaseOptions.playerLife;
    defense = 0;
    attack = 0;

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
        // TODO Operate means any operate player can be done.
        // Such as "select card and then select target", "select card and use it directly",
        // "select unit and select target"
        // \use\ and \bite\ use for test first.
    }

    *use(index: number) {
        let target = this.hand[index];
        // todo only implement summon here
        let targetPosition = yield;
        this.slot.battlefield.add(target, targetPosition);
    }

    *bite(index: number) {
        let creature: BaseCard = this.slot.battlefield.at(index);
        //todo yield to get target
        // todo interface here instead \BasePlayer\
        let target: BasePlayer = yield;
        target.life -= creature.attack;
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
