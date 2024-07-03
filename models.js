class Astrologer {
    constructor(id, name, isTop = false) {
        this.id = id;
        this.name = name;
        this.isTop = isTop;
        this.currentLoad = 0;
    }
}

class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

module.exports = { Astrologer, User };
