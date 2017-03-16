import {Util} from "../../../../lib/util/array";
import {BaseUser} from "../user/user";
import {BasePlayer} from "./player";
export class BaseRoom {
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
        user.game = this.game;
    }

    canStart(): boolean {
        // override this to extend
        return !(this.teams.some(x => x.size !== x.max));
    }

    start() {
        if (this.canStart()) {
            this.game.init();
        }
    }

}

export class BaseTeam {
    name: string;
    users: BaseUser[];
    max = 1;
    order: number;

    lost = false;

    public get size() {
        return this.users.length;
    }

    public get players() {
        return this.users.map(x => x.player);
    }

    constructor(name: string) {
        this.name = name;
    }

    add(user: BaseUser) {
        if (this.size < this.max) {
            this.users.push(user);
            user.team = this;
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

    hasSurvivor() {
        this.lost = !this.players.some(x => x.life > 0);
        return !this.lost;
    }
}

class BaseObserver extends BaseTeam {
    constructor() {
        super("Observer");
        this.max = 5;
    }
}

export class BaseGame {
    // usage to implement custom game settings
    settings: any;
    room: BaseRoom;
    players: BasePlayer[];

    end = false;

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
        for (let i = 0; i < this.players.length; i++) {
            if (this.end === false) {
                yield this.players[i].turn(this.nextGen);
            }
        }
    }

    validate() {
        let survivor: BaseTeam = null;
        for (let team of this.teams) {
            // warning in iterate all enumerable property names of an object
            if (team.hasSurvivor()) {
                if (!survivor) {
                    survivor = null;
                    break;
                } else {
                    survivor = team;
                }
            }
        }
        if (!survivor) {
            this.drawGame();
        } else {
            this.win(survivor);
        }
    }

    win(team: BaseTeam) {
        console.log(`Team ${team.name} win.`);
        this.end = true;
    }

    drawGame() {
        // 平局
        console.log("Draw.");
        this.end = true;
    }
}
