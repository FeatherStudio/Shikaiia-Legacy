class BaseBattlefield extends BaseZone {
    size = BaseOptions.maxCreatureCount;

    add(target: BaseCard, position: number) {

        if (this.currentCardCount < this.size && !this.collection.cards[position]) {
            this.collection.addAt(target, position);
        } else {
            raise(`Too many creatures.`)
        }
    }
}