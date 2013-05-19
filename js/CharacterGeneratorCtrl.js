// ------------------------------------------------------------------------
// Global Helper functions.
// ------------------------------------------------------------------------

function logError(errMsg) {
  console.log('[ERROR][CharacterGeneratorCtrl]' + errMsg);
}

function timestamp() {
  return new Date().getTime();
}

/**
 * @param str The input to validate
 * @return str The input value
 */
function throwIfNoString(str) {
  if (!(Object.prototype.toString.call(str) === '[object String]')) {
    throw new Error("Variable '"+str+"' must be of type 'String'.");
  }
  return str;
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



// ------------------------------------------------------------------------
// 'Classes' representing the domain model
// ------------------------------------------------------------------------

/**
 * Represents the CLASS (type) of a playable character class, e.g. 'Fighter'.
 *
 * @constructor
 */
function CharacterClass() {} // ATM, we only use this "class" via its prototype members

/**
 * The unique identifiers of a playable character class.
 *
 * @type {Object}
 */
CharacterClass.prototype.CLASS_ID = { // this object's properties will be used like an Enum in Java
  fighter: 'fighter',
  mage: 'mage',                       // (Adding a property to a functions prototype makes these properties
  thief: 'thief',                     // available to ALL instances created of this "class" (kind of like
  priest: 'priest'                    // declaring a static variable in Java).
};
/**
 * Creates an Array of all known unique identifiers (of a playable character class).
 */
CharacterClass.prototype.classIdsAsArray = function() {
  return valuesOf(CharacterClass.prototype.CLASS_ID);
};
/**
 * A mapping: 'Class ID' -> 'Display name of character class'.
 */
CharacterClass.prototype.DISPLAY_NAMES = (function(){ // Function gets executed immediately; its return value is then saved
  var classIdToDisplayName = {};
  classIdToDisplayName[CharacterClass.prototype.CLASS_ID.fighter] = 'Kämpfer';
  classIdToDisplayName[CharacterClass.prototype.CLASS_ID.mage] = 'Magier';
  classIdToDisplayName[CharacterClass.prototype.CLASS_ID.thief] = 'Dieb';
  classIdToDisplayName[CharacterClass.prototype.CLASS_ID.priest] = 'Kämpfer';
  return classIdToDisplayName;
})(); // <<< take a close look: We're invoking a function here!
/**
 * Returns the name displayed (in the GUI) for the ID of a character class.
 *
 * @param classId The ID of the character class we want to display
 */
CharacterClass.prototype.displayNameForClassId = function(classId) { // TODO input validation
  var knownClassId = !!(CharacterClass.prototype.DISPLAY_NAMES[classId]); // "!!" means: a) convert to Boolean b) invert value (to get original value back)
  if (knownClassId) {
    return CharacterClass.prototype.DISPLAY_NAMES[classId];
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
  this.displayName = displayName;//throwIfNoString(displayName);
  this.classId = throwIfNoString(classId);
  this.level = level;

  /**
   * @return hash A unique String hash of this Character.
   */
  function hash() {
    return classId.concat('_')
      .concat(displayName)
      .concat('_')
      .concat(timestamp()); // TODO Resolution is too low. Make if a real hash... ;-)
  }

  //
  // Export public API.
  //
  this.hash = hash;
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
// The actual controller for the form's input.
// ------------------------------------------------------------------------

function CharacterGeneratorCtrl($scope) {
  //
  // private controller state
  //
  var characterCollection = new CharacterCollection()
    .add(new Character('Gandalf', CharacterClass.prototype.CLASS_ID.mage, 20))
    .add(new Character('Gimli', CharacterClass.prototype.CLASS_ID.fighter, 18))
    .add(new Character('Legolas', CharacterClass.prototype.CLASS_ID.thief, 18));


  //
  // member properties - variables and functions - exported
  // in the Scope of the 'CharacterGeneratorCtrl'
  //
  $scope.availableLevels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  /**
   * List of available classes.
   *
   * @type {Array}
   */
  $scope.availableClassIds = CharacterClass.prototype.classIdsAsArray();

  /**
   * View of the list of created characters.
   *
   * @type {Array}
   */
  $scope.characters = characterCollection.toArray();

  /**
   *
   * Creates a new character depending on form input.
   *
   * @param formCharacterModel the character model of the &lt;form&gt; input in the UI
   */
  $scope.createCharacter = function(formCharacterModel){
    var charName
      , charClassId
      , charLevel
      , requiredCharPropertyMissing;

    if (!formCharacterModel) {
      logError("'newCharacter' is undefined (no form input given).");
      return;
    }

    // TODO delegate property check to character collection
    requiredCharPropertyMissing = !formCharacterModel.characterName || !formCharacterModel.classId || !formCharacterModel.level;
    if (requiredCharPropertyMissing) {
      logError("Cannot create new character! Required property missing in 'newCharacter'.");
      return;
    }

    charName = formCharacterModel.characterName;
    charClassId = formCharacterModel.classId;
    charLevel = formCharacterModel.level;
    characterCollection.add(new Character(charName, charClassId, charLevel));

    $scope.characters = characterCollection.toArray();
  };

  /**
   * TODO delegate to CharacterCollection
   *
   * Converts a character class ID to the class label.
   *
   * @param classId of the character class
   */
  $scope.classIdToClassLabel = function(classId) {
    return CharacterClass.prototype.displayNameForClassId(classId);
  }
}
