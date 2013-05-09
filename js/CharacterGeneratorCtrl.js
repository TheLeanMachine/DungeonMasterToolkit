function logError(errMsg) {
  console.log('[ERROR][CharacterGeneratorCtrl]' + errMsg);
}

function CharacterGeneratorCtrl($scope) {

  $scope.availableLevels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  /**
   * List of available classes.
   *
   * @type {Array}
   */
  $scope.availableClasses = [
// TODO 'availableClasses' should be a MAP of 'classId' -> 'className/Label'!
// TODO introduce 'Character' "class" (no actual classes in JavaScript! Pure objects, baby...)
    {id:'fighter', label:'KämXpfer'},
    {id:'thief', label:'Dieb'},
    {id:'mage', label:'Magier'},
    {id:'priest', label:'Priester'}
  ];

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
        return currentClass.label;
      }
    }
    return "No appropriate character class found for classId 'classId'";
  }
}
