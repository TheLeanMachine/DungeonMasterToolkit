/*
 * Rule Engine for the "Advanced Dungeons and Dragons" rule system
 *
 * Copyright (c) 2013 Kai Hoelscher
 * Licensed under the MIT license.
 */
(function (undefined) { // we always get 'undefined' here, since this code is directly invoked without arguments

  //
  // "constants"
  //
  var LIB_NAME = 'AdndRuleEngineApi';
  var GLOBAL_CONTEXT = this; // 'window' in the browser, or 'global' on the server (see very bottom of this file)

  //
  // private stuff
  //

  /**
   * TODO add doc
   * @constructor
   */
  function Hero(name) {
    this.name = name;
  }

  /**
   * TODO add doc
   */
  function createHero(heroName) {
    return new Hero(heroName);
  }

  /**
   * TODO add doc
   */
  function createHero(heroName) {
    return new Hero(heroName);
  }

  /**
   * TODO add doc
   * @constructor
   */
  function Battle() {
    var parties = {};

    /**
     * @return TRUE if {@link Battle} can be started
     */
    function isReady() {
      return numberOfOwnProperties(parties) > 1;
    }

    /**
     * Adds a new party to the {@link Battle}.
     * @param newParty
     */
    function addParty(newParty) {
      // TODO test code for input validation!
      var partyName = newParty.name;
      var unknownParty = !parties[partyName];
      if (unknownParty) {
        parties[partyName] = newParty;
      }
    }

    // exporting API
    this.isReady = isReady;
    this.addParty = addParty;
  }

  /**
   * TODO add doc
   */
  function createBattle() {
    return new Battle();
  }



  //
  // Helper functions
  //

  // TODO add doc
  function numberOfOwnProperties(obj) {
    var count = 0;
    forEachPropertyIn(obj, function() {
      ++count;
    });
    return count;
  }

  /**
   * TODO add doc
   * callback's signature is function(propertyValue)
   */
  function forEachPropertyIn(obj, callback) {
    var propertyName;
    var propertyValue;
    for (propertyName in obj) {
      if (obj.hasOwnProperty(propertyName)) {
        propertyValue = propertyName[propertyName];
        callback(propertyName);
      }
    }
  }

  function commonJsAvailable() {
    return (typeof module !== 'undefined' && module.exports); // checks for node.js, too
  }

  function enderAvailable() {
    /*global ender:false */
    return typeof ender === 'undefined';
  }

  function requireJsAvailable() {
    /*global define:false */
    return (typeof define === "function") && define.amd;
  }



  //
  // Exporting API
  //
  function AdndRuleEngineApi() { // The API to be exported by this library.
    this.createHero = createHero;
    this.createBattle = createBattle;
  }

  if (commonJsAvailable()) {
    module.exports = new AdndRuleEngineApi();

  } else if (enderAvailable()) {
    // add `guide` as a global object via a string identifier,
    // for Closure Compiler "advanced" mode
    GLOBAL_CONTEXT[LIB_NAME] = new AdndRuleEngineApi();

  } else if (requireJsAvailable()) {
    /*global define:false */
    var dependencies = []; // paths to local JS libs we depend on
    define(dependencies, function () { // add a parameter for each path in 'dependencies' (while keeping the order!)
      return new AdndRuleEngineApi();
    });

  } else { GLOBAL_CONTEXT[LIB_NAME] = new AdndRuleEngineApi(); }

}).call(this); // setting the current context to module's the global context