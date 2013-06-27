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
    battle.addParty({ name: 'dummy' });

    expect(battle.isReady()).toBe(false);
  });


  it("can be started with at least two participating parties.", function() {
    var battle = AdndRuleEngineApi.createBattle();
    battle.addParty({ name: 'theGoodGuys' });
    battle.addParty({ name: 'theBadGuys' });

    expect(battle.isReady()).toBe(true);
  });
});
