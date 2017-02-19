class BaseCardCollection {
    cards: BaseCard[];

    add(target: BaseCard) {
        this.cards.push(target);
    }

    remove(index: number) {
        this.cards.splice(index, 1);
    }
}

class SortedCardCollection extends BaseCardCollection{
    add(target: BaseCard){
        super.add(target);
        // todo sort
    }
}