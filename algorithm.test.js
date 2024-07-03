const FlowDistribution = require('./algorithm');
const { Astrologer, User } = require('./models');

test('distributeUser assigns user to astrologer with least load', () => {
    const flowDistribution = new FlowDistribution();
    const astrologer1 = new Astrologer(1, 'Astrologer 1');
    const astrologer2 = new Astrologer(2, 'Astrologer 2');

    flowDistribution.addAstrologer(astrologer1);
    flowDistribution.addAstrologer(astrologer2);

    const user = new User(1, 'User 1');
    const assignedAstrologer = flowDistribution.distributeUser(user);

    expect(assignedAstrologer).toBe(astrologer1);
    expect(astrologer1.currentLoad).toBe(1);
});

test('toggleTopAstrologer toggles the isTop property', () => {
    const flowDistribution = new FlowDistribution();
    const astrologer = new Astrologer(1, 'Astrologer 1');

    flowDistribution.addAstrologer(astrologer);
    expect(astrologer.isTop).toBe(false);

    flowDistribution.toggleTopAstrologer(1);
    expect(astrologer.isTop).toBe(true);

    flowDistribution.toggleTopAstrologer(1);
    expect(astrologer.isTop).toBe(false);
});

test('distributeUser assigns user to astrologer with least load (multiple astrologers)', () => {
    const flowDistribution = new FlowDistribution();
    const astrologer1 = new Astrologer(1, 'Astrologer 1');
    const astrologer2 = new Astrologer(2, 'Astrologer 2');

    flowDistribution.addAstrologer(astrologer1);
    flowDistribution.addAstrologer(astrologer2);

    // Assign some initial load to astrologer2
    astrologer2.currentLoad = 2;

    const user = new User(1, 'User 1');
    const assignedAstrologer = flowDistribution.distributeUser(user);

    expect(assignedAstrologer).toBe(astrologer1);
    expect(astrologer1.currentLoad).toBe(1);
});

test('toggleTopAstrologer toggles the isTop property (multiple astrologers)', () => {
    const flowDistribution = new FlowDistribution();
    const astrologer1 = new Astrologer(1, 'Astrologer 1');
    const astrologer2 = new Astrologer(2, 'Astrologer 2');

    flowDistribution.addAstrologer(astrologer1);
    flowDistribution.addAstrologer(astrologer2);

    expect(astrologer1.isTop).toBe(false);
    expect(astrologer2.isTop).toBe(false);

    flowDistribution.toggleTopAstrologer(1);
    expect(astrologer1.isTop).toBe(true);
    expect(astrologer2.isTop).toBe(false);

    flowDistribution.toggleTopAstrologer(1); // Toggle it back to false
    expect(astrologer1.isTop).toBe(false);
    expect(astrologer2.isTop).toBe(false); // Ensure astrologer2 remains unchanged

    flowDistribution.toggleTopAstrologer(2);
    expect(astrologer1.isTop).toBe(false); // Ensure astrologer1 remains unchanged
    expect(astrologer2.isTop).toBe(true);
});
