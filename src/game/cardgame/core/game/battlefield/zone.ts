abstract class BaseZone {
    collection: BaseCardCollection;

    get currentCardCount(){
        return this.collection.size;
    }

    at(index: number){
        return this.collection.cards[index];
    }
}