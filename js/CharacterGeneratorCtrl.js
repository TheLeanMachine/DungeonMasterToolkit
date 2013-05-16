function logError(errMsg) {
  console.log('[ERROR][CharacterGeneratorCtrl]' + errMsg);
}


/*var CLASS_ID = { // this object's properties will be used like an Enum in Java
  fighter: 'fighter',
  mage: 'mage',
  thief: 'thief',
  priest: 'priest'
};*/

/**
 * Represents the CLASS (type) of a playable character class, e.g. 'Fighter'.
 *
 * @param id Unique identifier of the player character's class
 * @param name Displayed name of the player character's class
 * @constructor
 */
function CharacterClass(id, name) {
  this.id = id; // 'id' is only visible in this objects closure (yep, functions are objects, too!)
  this.displayName = name;
}
// this object's properties will be used like an Enum in Java
CharacterClass.prototype.CLASS_ID = { // (Adding a property to a functions prototype makes this property
  fighter: 'fighter',                 // available to ALL instances created of this class (kind of like
  mage: 'mage',                       // declaring a static variable in Java).
  thief: 'thief',
  priest: 'priest'
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
  this.displayName = displayName;
  this.classId = classId; // TODO check, if classId is a String
  this.level = level;

  /**
   * Create a unique hash of this Character.
   */
  function hash() {
    return this.classId.concat(this.displayName); // TODO fix IDEA warning
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
    var key
      , currentChar;
    for (key in store) { // iterate over the properties (=keys) of the object
      currentChar = store[key];
      callback(currentChar);
    }
  }

  // TODO input validation(?)
  // TODO add doc
  function toArray() {
    var charArray = [];
    forEach(function(character) {
      charArray.push(character);
    });
    return charArray;
  }


  //
  // Export public API.
  //
  this.add = add;
  this.remove = remove;
  this.forEach = forEach;
  this.toArray = toArray;
}



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
  $scope.availableClasses = [ // TODO rename
    new CharacterClass(CharacterClass.prototype.CLASS_ID.fighter, 'Kämpfer'),
    new CharacterClass(CharacterClass.prototype.CLASS_ID.mage, 'Magier'),
    new CharacterClass(CharacterClass.prototype.CLASS_ID.thief, 'Dieb'),
    new CharacterClass(CharacterClass.prototype.CLASS_ID.priest, 'Priester')
  ];

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
    var i;
    var numOfClasses = $scope.availableClasses.length;
    var classes = $scope.availableClasses;
    var currentClass;

    for (i=0; i<numOfClasses; ++i) {
      currentClass = classes[i];
      if (currentClass.id === classId) {
        return currentClass.displayName;
      }
    }

    return "No appropriate character class found for classId '"+classId+"'";
  }
}
