
import {SortedCollection} from "../../../app/component/ds/collection";
import {range} from "../collection/array";

export const testCollectionConstruct = function(){
    let collection = new SortedCollection();
    for (let i of range(40)){
        // collection.add(testDataConstruct());
    }
    return collection
};

export const testDataConstruct = function () {

};
