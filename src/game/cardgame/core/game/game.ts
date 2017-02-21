import {Util} from "../../../../lib/util/array";
class BaseRoom {
    id: number;

    teams: BaseTeam[];
    observers = new BaseObserver();

    game: BaseGame;

    constructor() {
        this.initRoom();
    }

    initRoom() {
        this.game = new BaseGame(this);
        this.teams.push(new BaseTeam("Red"));
        this.teams.push(new BaseTeam("Black"));
    }

    searchTeam(name: string): BaseTeam {
        return this.teams.find(x => x.name === name);
    }

    addUser(user: BaseUser, teamName: string) {
        this.searchTeam(teamName).add(user);
    }

    canStart(): boolean {
        return !(this.teams.some(x => x.size !== 1));
    }

    start() {
        if (this.canStart()) {
            this.game.init();
        }
    }

}

class BaseTeam {
    name: string;
    users: BaseUser[];
    max = 1;
    order: number;

    public get size() {
        return this.users.length;
    }

    constructor(name: string) {
        this.name = name;
    }

    add(user: BaseUser) {
        if (this.size < this.max) {
            this.users.push(user);
        } else {
            raise(`Team ${this.name} is full, but ${user.id} want to join.`);
        }
    }

    remove(user: BaseUser) {
        let index = this.users.indexOf(user);
        if (index === -1) {
            raise(`Trying to remove user ${user.id} from team ${this.name} but no such user.`);
            return;
        }
        this.users.splice(index, 1);
    }
}

class BaseObserver extends BaseTeam {
    constructor() {
        super("Observer");
        this.max = 5;
    }
}

class BaseGame {
    // usage to implement custom game settings
    settings: any;
    room: BaseRoom;
    players: BasePlayer[];

    nextGen: IterableIterator<any>;

    constructor(room: BaseRoom) {
        this.room = room;
    }

    set teams(target: BaseTeam[]) {
        this.room.teams = target;
    }

    get teams() {
        return this.room.teams;
    }

    init() {
        this.teams = Util.randomize(this.room.teams);
        this.teams.forEach((x, i) => x.order = i);

        this.teams.forEach(x => {
            x.users.forEach(
                y => {
                    y.player = new BasePlayer(y.selectedDeck);
                    this.players.push(y.player);
                }
            )
        });

        this.nextGen = this.start();
    }

    *start() {
        for(let i = 0; i < this.players.length; i++){
            yield this.players[i].turn(this.nextGen);
        }
    }
}
