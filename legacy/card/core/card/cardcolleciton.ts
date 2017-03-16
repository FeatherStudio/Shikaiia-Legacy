import {BaseCard} from "./card";
import {range} from "../../../../../lib/extension/collection/array";
export class BaseCardCollection {
    cards: BaseCard[];

    get size(){
        return this.cards.length;
    }

    add(target: BaseCard) {
        this.cards.push(target);
    }

    addAt(target: BaseCard, position: number){
        this.cards[position] = target;
    }

    remove(index: number) {
        this.cards.splice(index, 1);
    }
}

export class SortedCardCollection extends BaseCardCollection{
    add(target: BaseCard){
        super.add(target);
        // todo sort
    }

    static testCollectionConstruct(){
        let collection = new SortedCardCollection();
        for (let i of range(40)){
            collection.add(BaseCard.testCardConstruct());
        }
        return collection
    }
}

export const BASIC_COLLECTION = new SortedCardCollection();