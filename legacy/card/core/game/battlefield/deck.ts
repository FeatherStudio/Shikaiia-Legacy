import {BaseCard} from "../../card/card";
import {SortedCardCollection, BASIC_COLLECTION, BaseCardCollection} from "../../card/cardcolleciton";
export class BaseDeck {
    collection: SortedCardCollection;
    size: number;

    constructor(collection: SortedCardCollection = null){
        this.collection = collection === null ? BASIC_COLLECTION : collection;
    }

    add(target: BaseCard) {
        this.collection.add(target);
        // todo sort
    }

    remove(index: number) {
        this.collection.remove(index);
    }

    get cards() {
        return this.collection.cards;
    }

    get(from: number, to: number): BaseCard[] {
        return this.collection.cards.slice(from, to)
    }

    drawCard(count: number): BaseCard[] {
        let rest = this.cards.length;
        let actual = count > rest ? rest : count;
        return this.get(0, actual);
    }

    sort() {

    }

    shuffle() {

    }

    static testDeckConstruct(){
        return new BaseDeck(SortedCardCollection.testCollectionConstruct());
    }
}

export const BASIC_TEST_DECK = BaseDeck.testDeckConstruct();