// ------------------------------------------------------------------------
// The controller for handling form input.
// ------------------------------------------------------------------------

function CharacterGeneratorCtrl($scope) {
  //
  // private controller state
  //

  /**
   * Collection of characters created with this controller.
   */
  var _characterCollection = (function(){ // Function gets executed immediately!
    var collection;
    var gandalf = RULE_ENGINE.createCharacter('Gandalf', HeroType.prototype.CLASS_ID.mage, 20);
    var gimli = RULE_ENGINE.createCharacter('Gimli', HeroType.prototype.CLASS_ID.fighter, 18);
    var legolas = RULE_ENGINE.createCharacter('Legolas', HeroType.prototype.CLASS_ID.thief, 18);

    collection = RULE_ENGINE.createCharacterCollection()
      .add(gandalf)
      .add(legolas)
      .add(gimli);
    return collection;
  })();



  //
  // member properties - variables and functions - exported
  // in the Scope of the 'CharacterGeneratorCtrl'
  //

  /**
   * List of available, numerical levels.
   *
   * @type {Array}
   */
  $scope.availableLevels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  /**
   * List of available class IDs.
   *
   * @type {Array}
   */
  $scope.availableClassIds = HeroType.prototype.classIdsAsArray();

  /**
   * View of the list of created characters.
   *
   * @type {Array}
   */
  $scope.characters = viewModelOfCharacterCollection();

  /**
   *
   * Creates a new character depending on form input.
   *
   * @param formCharacterModel the character model of the &lt;form&gt; input in the UI
   */
  $scope.createCharacter = function(formCharacterModel){
    try {
      validate(formCharacterModel); // TODO Throwing Errors seems not appropriate for invalid user input. Rethink!
      createCharacterFrom(formCharacterModel);
    } catch (err) {
      logError(err);
    }

    $scope.characters = viewModelOfCharacterCollection();
  };

  /**
   * Validates the input data submitted by the website visitor.
   *
   * Note that this function is private to the controller (since not exported via '$scope')!
   *
   * @param formCharacterModel the form input holding the model of a character
   * @throws Error If 'formCharacterModel' did not provide the required data
   */
  function validate(formCharacterModel) {
    var requiredPropertyMissing;

    if (!formCharacterModel) {
      throw new Error("'formCharacterModel' is undefined (= no form input given).");
    }

    requiredPropertyMissing = !formCharacterModel.characterName || !formCharacterModel.classId || !formCharacterModel.level;
    if (requiredPropertyMissing) {
      throw new Error("Cannot create character: Required property missing.");
    }
  }

  /**
   * Creates a new character based on the given form input.
   *
   * Note that this function is private to the controller (since not exported via '$scope')!
   *
   * @param formCharacterModel The form input holding the model of a character
   * @throws Error If 'formCharacterModel' did not provide the required data
   */
  function createCharacterFrom(formCharacterModel) {
    var intLevel = parseInt(formCharacterModel.level, 10); // '10' is the radix (= dt. "dezimal system")
    var newCharacter = RULE_ENGINE.createCharacter(formCharacterModel.characterName, formCharacterModel.classId, intLevel);
    _characterCollection.add(newCharacter);
  }

  /**
   * Creates an Array of {@link Character} view models of all created characters.
   *
   * Note that this function is private to the controller (since not exported via '$scope')!
   */
  function viewModelOfCharacterCollection() {
    var views = [];
    _characterCollection.forEach(function(character) {
      views.push({ // here we create an object literal as the view that gets then rendered in 'app.html'!
        classId: character.getId(),
        displayName: character.getDisplayName(),
        level: character.getLevel()
      });
    });
    return views;
  }

  /**
   * Converts a character class ID to the class label.
   *
   * @param classId of the character class
   */
  $scope.classIdToClassLabel = function(classId) {
    return HeroType.prototype.displayNameForClassId(classId);
  }
}



// ------------------------------------------------------------------------
// 'Classes' representing the domain model
// ------------------------------------------------------------------------

/**
 * The Rule Engine acts as a facade to its clients: It bundles all operations one can think
 * of regarding Characters (and other ADnD/RPG stuff) and hides it behind a single API. The
 * clients don't know the implementation details of {@link Character}, they just see this
 * API! (TODO create a module for the Rule Engine and all related domain objects)
 *
 * (Here we create a singleton: We will only need rule engine for our entire application! The
 *  singleton is established simply as a collection of function properties assigned to an
 *  object.)
 *
 * @type {Object}
 */
var RULE_ENGINE = {
  // TODO add doc
  createCharacter: function(charName, charClassId, charLevel) {
    return new Character(charName, charClassId, charLevel); // TODO input validate TODO error handling(?)
  },

  // TODO add doc
  createCharacterCollection: function() {
    return new CharacterCollection();
  }
};

/**
 * Represents the type of a hero.
 *
 * For sakes of clarity we don't use the Pen-and-Paper terms: Instead of "class" (Fighter, Mage, ...) we say "hero".
 *
 * @constructor
 */
function HeroType() {} // ATM, we only use this "class" via its prototype members
/**
 * The unique identifiers of a playable character class.
 *
 * @type {Object}
 */
HeroType.prototype.CLASS_ID = { // this object's properties will be used like an Enum in Java
  fighter: 'fighter',
  mage: 'mage',                 // (Adding a property to a functions prototype makes these properties
  thief: 'thief',               // available to ALL instances created of this "class" (kind of like
  priest: 'priest'              // declaring a static variable in Java).
};
// Now: Make all properties of our "enum" immutable (to behave like a Java Enum)
Object.freeze(HeroType.prototype.CLASS_ID);

/**
 * Creates an Array of all known unique identifiers (of a playable character class).
 */
HeroType.prototype.classIdsAsArray = function() {
  return valuesOf(HeroType.prototype.CLASS_ID);
};

/**
 * A mapping: 'Class ID' -> 'Display name of character class'.
 */
HeroType.prototype.DISPLAY_NAMES = (function(){ // Function gets executed immediately; its return value is then saved
  var mapClassIdToDisplayName = {};
  mapClassIdToDisplayName[HeroType.prototype.CLASS_ID.fighter] = 'Kämpfer';
  mapClassIdToDisplayName[HeroType.prototype.CLASS_ID.mage] = 'Magier';
  mapClassIdToDisplayName[HeroType.prototype.CLASS_ID.thief] = 'Dieb';
  mapClassIdToDisplayName[HeroType.prototype.CLASS_ID.priest] = 'Kämpfer';
  return mapClassIdToDisplayName;
})(); // <<< take a close look: We're invoking a function here!

/**
 * Returns the name displayed (in the GUI) for the ID of a character class.
 *
 * @param classId The ID of the character class we want to display
 */
HeroType.prototype.displayNameForClassId = function(classId) { // TODO input validation
  var knownClassId = !!(HeroType.prototype.DISPLAY_NAMES[classId]); // "!!" means: a) convert to Boolean b) invert value (to get original value back)
  if (knownClassId) {
    return HeroType.prototype.DISPLAY_NAMES[classId];
  }
  return "No appropriate character class found for classId '"+classId+"'";
};

/**
 * Represents a player character (e.g. 'Gandalf', 20-lvl mage).
 *
 * @param displayName TODO add doc
 * @param classId TODO add doc
 * @param level TODO add doc
 * @constructor
 */
function Character(displayName, classId, level) {
/*  this.displayName = throwIfNoString(displayName); // Nice thing here: Arguments of "throwIf..." functions are returned
  this.classId = throwIfNoString(classId);         // if they are valid. Leads to short, readable code.
  this.level = throwIfNoIntegerGreaterZero(level); */
  var _classId = throwIfNoString(classId);
  var _displayName =  throwIfNoString(displayName);
  var _level = throwIfNoIntegerGreaterZero(level);

  /**
   * @return hash A unique String hash of this Character.
   */
  function hash() {
    return classId.concat('_')
      .concat(displayName)
      .concat('_')
      .concat(timestamp()); // TODO Time Resolution is too low. This is no real hash!
  }

  //
  // Export public API.
  //
  this.hash = hash;
  this.getId = function() { return _classId; }; // (the "constructor" argument) 'classID' is accessed from function's closure!
  this.getDisplayName = function() { return _displayName; };
  this.getLevel = function() { return _level; };
}

/**
 * A collection of {@link Character}.
 *
 * @constructor
 */
function CharacterCollection() {
  //
  // private members
  //
  var store = {}; // object used as map-like store

  // TODO input validation(?)
  // TODO check for existing character in store?
  // TODO add doc
  function add(character) {
    var key = character.hash();
    store[key] = character;
    return this; // returning 'this' enables "method chaining": myColl.add(..).add(...)
  }

  // TODO input validation(?)
  // TODO add doc
  function remove(character) {
    var key = character.hash();
    return (delete store[key]); // TRUE, if removal succeeded
  }

  // TODO input validation(?)
  // TODO add doc
  function forEach(callback) {
    forEachPropertyIn(store, callback);
  }

  // TODO input validation(?)
  // TODO add doc
  function toArray() {
    return valuesOf(store);
  }


  //
  // Export public API.
  //
  this.add = add;
  this.remove = remove;
  this.forEach = forEach;
  this.toArray = toArray;
}



// ------------------------------------------------------------------------
// Global Helper functions.
// ------------------------------------------------------------------------

function logError(error) {
  console.log('[ERROR][CharacterGeneratorCtrl] ' + error.message);
}

function timestamp() {
  return new Date().getTime();
}

/**
 * @param potentialString Variable whose type gets checked
 * @returns {boolean} TRUE, if 'potentialString' is a 'String'
 */
function isString(potentialString) {
  // 'Object.prototype.toString(...)' is used here, since we want to use the
  // native/ 'toString()' instead of a potentially existing, custom
  // toString()-method!
  return Object.prototype.toString.call(potentialString) === '[object String]';
}

function isIntegerGreaterZero(potentialInt) {
  return (typeof potentialInt === 'number') // object of type 'Number'?
    && !window.isNaN(potentialInt) // check for 'NaN' (actually, "potentialInt % 1 === 0" does the job, too!)
    && window.isFinite(potentialInt) // check for 'Number.POSITIVE_INFINITY' and 'Number.NEGATIVE_INFINITY' (actually, "potentialInt % 1 === 0" does the job, too!)
    && (potentialInt % 1 === 0) // since "1.00042 modulo 1" gives you '0.00042...' (where '...' is "machine dependant random float stuff" ;-)
    && (potentialInt > 0);
}

function throwIfNoString(potentialString) {
  if (!isString(potentialString)) {
    throw new Error("'"+potentialString+"' is not a 'String'.");
  }
  return potentialString;
}

function throwIfNoIntegerGreaterZero(potentialInt) {
  if (!isIntegerGreaterZero(potentialInt)) {
    throw new Error("'"+potentialInt+"' is not an Integer greater zero.");
  }
  return potentialInt;
}

/**
 * Iterates over properties of an object and executes a callback for each value.
 *
 * TODO input validation
 *
 * @param obj The object that gets iterated over
 * @param callback The callback function (signature: <code>function(propertyValue)</code>) being applied to each of the object's property values
 */
function forEachPropertyIn(obj, callback) {
  var propertyName
    , propertyValue;
  for (propertyName in obj) { // iterate over the properties (=keys) of the object
    propertyValue = obj[propertyName];
    callback(propertyValue);
  }
}

/**
 * Iterates over properties of an object and returns their values as an Array.
 *
 * TODO input validation
 *
 * @param obj The object that gets iterated over
 */
function valuesOf(obj) {
  var result = [];
  forEachPropertyIn(obj, function(propertyValue){
    result.push(propertyValue);
  });
  return result;
}
