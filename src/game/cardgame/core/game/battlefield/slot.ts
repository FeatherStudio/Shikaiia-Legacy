// use to slot game zone
// game zone like deck/field/graveyard, so it can be easy to add new zone like "environment card", "trap card"

class BaseSlot {
    zones: {[key: string]: BaseZone};

    constructor() {
        this.add("graveyard", new BaseGraveyard());
        this.add("battlefield", new BaseBattlefield());
    }

    get graveyard(){
        return this.get("graveyard") as BaseGraveyard;
    }
    get battlefield(){
        return this.get("battlefield") as BaseBattlefield;
    }

    get(name: string) {
        return this.zones[name];
    }

    add(name: string, zone: BaseZone) {
        this.zones[name] = zone;
    }

    remove(name: string) {
        delete this.zones[name];
    }
}
