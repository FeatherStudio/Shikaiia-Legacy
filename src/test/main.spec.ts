import {BaseRoom, BaseGame} from "../all-game/hs-like/card/core/game/game";
import {BaseUser} from "../all-game/hs-like/card/core/user/user";
const fullTest = true;

if (fullTest) {
    describe("Test framework should work", function () {
        it("1+1=2", function () {
            expect(1 + 1).toBe(2);
        })
    });

    describe("Tiny 1 vs 1 game", function () {
        let room = new BaseRoom();
        let userA = new BaseUser(1121139947);
        let userB = new BaseUser(1);
        let game = new BaseGame(room);

    });


}
