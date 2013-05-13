function logError(errMsg) {
  console.log('[ERROR][CharacterGeneratorCtrl]' + errMsg);
}


/**
 * An instance represents a playable character class, e.g. 'Fighter'.
 *
 * @constructor
 */

/**
 *
 * @param id Unique identifier of the player character's class
 * @param name Displayed name of the player character's class
 * @constructor
 */
function PlayerClass(id, name) {
  this.id = id; // 'id' is only visible in this objects closure (yep, functions are objects, too!)
  this.displayName = name;
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
    new PlayerClass(CLASS_ID.fighter, 'Kämpfer'),
    new PlayerClass(CLASS_ID.mage, 'Magier'),
    new PlayerClass(CLASS_ID.thief, 'Dieb'),
    new PlayerClass(CLASS_ID.priest, 'Priester')
  ];

  /**
   * List of characters.
   *
   * @type {Array}
   */
  $scope.characters = [
    { characterName: 'Gandalf', classId: 'mage', level: 20},
    { characterName: 'Gimli', classId: 'fighter', level: 18}
  ];

  /**
   * Creates a new character depending on form input.
   *
   * @param formCharacterModel the character model of the &lt;form&gt; input in the UI
   */
  $scope.createCharacter = function(formCharacterModel){
    // make a copy from the form input (otherwise, changes in the form
    // input would be reflected in the list of all characters!
    var newCharacter = angular.copy(formCharacterModel);
    var requiredCharPropertyMissing;

    if (!newCharacter) {
      logError("'newCharacter' is undefined (no form input given).");
      return;
    }

    requiredCharPropertyMissing = !newCharacter.characterName || !newCharacter.classId || !newCharacter.level;
    if (requiredCharPropertyMissing) {
      logError("Cannot create new character! Required property missing in 'newCharacter'.");
      return;
    }

    $scope.characters.push(newCharacter);
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
