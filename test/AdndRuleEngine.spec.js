/*
var dependencies = [];
/var ruleEngine = require(dependencies, '../js/lib/AdndRuleEngine.js');    vvv
                                                                            v      */
describe("A 'Battle' of 'AdndRuleEngine'", function(/*ruleEngine*/) {


  it("cannot be started, if no one joined it.", function() {
    var battle = AdndRuleEngineApi.createBattle();

    expect(battle.isReady()).toBe(false);
  });

  it("cannot be started with one party.", function() {
    var battle = AdndRuleEngineApi.createBattle();
    battle.addParty({});
    battle.addParty({});

    expect(battle.isReady()).toBe(true);
  });

  it("can be started with at least to participating parties.", function() {
    var battle = AdndRuleEngineApi.createBattle();
    battle.addParty({});
    battle.addParty({});

    expect(battle.isReady()).toBe(true);
  });
});
