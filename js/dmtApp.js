// declare the main module (the entry point for the "Dungeon
// Master Toolkit" (DMT) application to start
var dependencies = [];
var dmtMainModule = angular.module('dmtApp', dependencies);

// configure the DMT app
/*
dmtMainModule.factory('AdndRuleEngine', function() {
  var ruleEngine = {
    // TODO add doc
    createCharacter: function(charName, charClassId, charLevel) {
      return new Character(charName, charClassId, charLevel); // TODO input validate TODO error handling(?)
    },

    // TODO add doc
    createCharacterCollection: function() {
      return new CharacterCollection();
    }
  };
  return ruleEngine;
});*/

// test...
dmtMainModule.filter('greet', function() {
  return function(name) {
    return 'Hello, ' + name + '!';
  };
});


//============================================================


