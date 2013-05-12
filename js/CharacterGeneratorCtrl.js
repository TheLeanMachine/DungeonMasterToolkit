function logError(errMsg) {
  console.log('[ERROR][CharacterGeneratorCtrl]' + errMsg);
}


/**
 * An instance represents a playable character class, e.g. 'Fighter'.
 *
 * @constructor
 */


function PlayerClass(id, name) {
  this.id = id; // 'id' is only visible in this objects closure (yep, functions are objects, too!)
  this.name = name;
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

  /*$scope.availableClasses = [
// TODO 'availableClasses' should be a MAP of 'classId' -> 'className/Label'!
// TODO introduce 'CharacterClass' "class" (no actual classes in JavaScript! Pure objects, baby...)
    {id:'fighter'},
    {id:'thief', label:'Dieb'},
    {id:'mage', label:'Magier'},
    {id:'priest', label:'Priester'}
  ];*/

  /**
   * List of characters.
   *
   * @type {Array}
   */
  $scope.characters = [
    { name: 'Gandalf', classId: 'mage', level: 20},
    { name: 'Gimli', classId: 'fighter', level: 18}
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

    requiredCharPropertyMissing = !newCharacter.name || !newCharacter.classId || !newCharacter.level;
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
// TODO 'availableClasses' should be a MAP of 'classId' -> 'className/Label'!
    for (i=0; i<numOfClasses; ++i) {
      currentClass = classes[i];
      if (currentClass.id === classId) {
        return currentClass.name;
      }
    }
    return "No appropriate character class found for classId 'classId'";
  }
}
