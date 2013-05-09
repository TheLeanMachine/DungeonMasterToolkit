function logError(errMsg) {
  console.log('[ERROR][CharacterGeneratorCtrl]' + errMsg);
}

function CharacterGeneratorCtrl($scope) {
  $scope.characters = [
    { name: 'Gandalf', class: 'Magier', level: 20},
    { name: 'Gimli', class: 'Kämpfer', level: 18}
  ];

  /**
   * @param newCharacter the Character to create
   */
  $scope.createCharacter = function(newCharacter){
    var requiredCharPropertyMissing;

    if (!newCharacter) {
      logError("'newCharacter' is undefined (No charter object provided).");
      return;
    }

    requiredCharPropertyMissing = !newCharacter.name || !newCharacter.class || !newCharacter.level;
    if (requiredCharPropertyMissing) {
      logError("Cannot create new character! Required property missing in 'newCharacter'.");
      return;
    }

    $scope.characters.push(newCharacter);
  };
}
