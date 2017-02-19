// use to slot game zone
// game zone like deck/field/graveyard, so it can be easy to add new zone like "environment card", "trap card"

class BaseSlot {
    zones: BaseZone[];

    constructor(){
        this.add(new BaseGraveyard());
        this.add(new BaseBattlefield());
    }

    add(zone: BaseZone){
        this.zones.push(zone);
    }

    remove(index: number){
        this.zones.splice(index,1);
    }
}
