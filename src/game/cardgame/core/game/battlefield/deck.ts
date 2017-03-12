import {BaseCard} from "../../card/card";
import {SortedCardCollection} from "../../card/cardcolleciton";
export class BaseDeck {
    collection: SortedCardCollection;

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

}