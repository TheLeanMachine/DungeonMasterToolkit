function logError(errMsg) {
  console.log('[ERROR][CharacterGeneratorCtrl]' + errMsg);
}


/**
 * Represents the CLASS of a playable character class, e.g. 'Fighter'.
 *
 * @param id Unique identifier of the player character's class
 * @param name Displayed name of the player character's class
 * @constructor
 */
function CharacterClass(id, name) {
  this.id = id; // 'id' is only visible in this objects closure (yep, functions are objects, too!)
  this.displayName = name;
}


/**
 * Represents a player character (e.g. 'Gandalf', 20-lvl mage).
 *
 * @param characterName TODO add doc
 * @param classId TODO add doc
 * @param level TODO add doc
 * @constructor
 */
function Character(characterName, classId, level) {
  this.characterName = characterName;
  this.classId = classId;
  this.level = level;
}


function CharacterGeneratorCtrl($scope) {

  //
  // "constants"
  //
  var CLASS_ID = { // this object's properties will be used like an Enum in Java
    fighter: 'fighter',
    mage: 'mage',
    thief: 'thief',
    priest: 'priest'
  };


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
    new CharacterClass(CLASS_ID.fighter, 'Kämpfer'),
    new CharacterClass(CLASS_ID.mage, 'Magier'),
    new CharacterClass(CLASS_ID.thief, 'Dieb'),
    new CharacterClass(CLASS_ID.priest, 'Priester')
  ];

  /**
   * List of characters.
   *
   * @type {Array}
   */
  $scope.characters = [
    new Character('Gandalf', 'mage', 20),
    new Character('Gimli', 'fighter', 18),
    new Character('Legolas', 'fighter', 18)
  ];

  /**
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

    requiredCharPropertyMissing = !formCharacterModel.characterName || !formCharacterModel.classId || !formCharacterModel.level;
    if (requiredCharPropertyMissing) {
      logError("Cannot create new character! Required property missing in 'newCharacter'.");
      return;
    }

    charName = formCharacterModel.characterName;
    charClassId = formCharacterModel.classId;
    charLevel = formCharacterModel.level;
    $scope.characters.push(new Character(charName, charClassId, charLevel));
  };

  /**
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
