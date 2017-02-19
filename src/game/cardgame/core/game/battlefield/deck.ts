class BaseDeck {
    collection: SortedCardCollection;

    add(target: BaseCard) {
        this.collection.add(target);
        // todo sort
    }

    remove(index: number) {
        this.collection.remove(index);
    }

    get(from: number, to: number): BaseCard[] {
        return this.collection.cards.slice(from, to)
    }

    drawCard(count: number): BaseCard[] {
        return this.get(0, count);
    }

    sort() {

    }

    shuffle() {

    }

}