export class BaseCollection<T> extends Array<T> {
    value: T[];

    get size() {
        return this.value.length;
    }

    add(target: T) {
        this.value.push(target);
    }

    addAt(target: T, position: number) {
        this.value[position] = target;
    }

    remove(index: number) {
        this.value.splice(index, 1);
    }
}

export class SortedCollection<T> extends BaseCollection<T> {
    add(target: T) {
        super.add(target);
        // todo sort
    }
}
