var dependencies = [];
//var ruleEngine = require(dependencies, '../js/lib/AdndRuleEngine.js');



describe("Tests for AdndRuleEngine", function(ruleEngine) {
  var battle = ruleEngine.createBattle();

  it("should create a named here", function() {
    expect(battle.isReady()).toBe(true);
  });
});
