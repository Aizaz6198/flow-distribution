class FlowDistribution {
    constructor() {
        this.astrologers = [];
    }

    addAstrologer(astrologer) {
        this.astrologers.push(astrologer);
    }

    distributeUser(user) {
        if (this.astrologers.length === 0) return null;

        // Sort astrologers by load and whether they are top astrologers
        this.astrologers.sort((a, b) => {
            if (a.isTop && !b.isTop) return -1;
            if (!a.isTop && b.isTop) return 1;
            return a.currentLoad - b.currentLoad;
        });

        // Select the astrologer with the least load
        const selectedAstrologer = this.astrologers[0];
        selectedAstrologer.currentLoad += 1;

        return selectedAstrologer;
    }

    toggleTopAstrologer(astrologerId) {
        const astrologer = this.astrologers.find(a => a.id === astrologerId);
        if (astrologer) {
            astrologer.isTop = !astrologer.isTop;
        }
    }
}

module.exports = FlowDistribution;
