class BaseBuff {
    apply(target: BaseCard) {
        // do the thing you want
    }
}

class BaseBuffType {
    public RAISE_ATTACK = 1;
    public RAISE_DEFENSE = 2;
    public RAISE_LIFE = 3;
    public SET_ATTACK = 4;
    public SET_DEFENSE = 5;
    public SET_LIFE = 6;
}
