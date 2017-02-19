class BasePlayer {
    deck: BaseDeck;
    hand: BaseCard[];
    slot = new BaseSlot();
    order: number;

    life = BaseOptions.playerLife;
    defense = 0;
    attack = 0;

    constructor(deck: BaseDeck) {
        this.deck = deck;
        this.deck.shuffle();
    }

    draw(count: number) {
        this.deck.drawCard(count);
    }

}
