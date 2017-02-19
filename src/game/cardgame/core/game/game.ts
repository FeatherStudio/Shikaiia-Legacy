class BaseRoom {
    id: number;

    teams: BaseTeam[];
    observers = new BaseObserver();

    game: BaseGame;

    constructor() {
        this.initRoom();
    }

    initRoom() {
        this.teams.push(new BaseTeam("Red"));
        this.teams.push(new BaseTeam("Black"));
    }

    searchTeam(name: string) : BaseTeam{
        return this.teams.find(x => x.name === name);
    }

    add() {

    }

    start() {
        this.game = new BaseGame();
    }

}

class BaseTeam {
    name: string;
    users: BaseUser[];
    size = 1;

    constructor(name: string) {
        this.name = name;
    }

    add(user: BaseUser) {
        this.users.push(user);
    }

    remove(user: BaseUser) {
        let index = this.users.indexOf(user);
        this.users.splice(index, 1);
    }
}

class BaseObserver extends BaseTeam {
    constructor() {
        super("Observer");
        this.size = 5;
    }
}

class BaseGame {
    // usage to implement custom game settings
    settings: any;
}