DungeonMasterToolkit **alpha**
==============================

*DungeonMasterToolkit* is a JavaScript application thats supports a Dungeon Master during an Pen-and-Paper session (offline and online).

ToDOs
-----
0. A `Character` should have a `CharacterClass` property, or not?)
0. Filter input of Character Generator's text field (e.g. prone to XSS attacks?)
0. Use async file loading (modularization)
0. Add unit tests
0. Set up automated build infrastructure (JSLint, Auto-Format, Unit-Tests, Minify, ...)
0. Configure travis-ci.org


How does it help?
-----------------
*DungeonMasterToolkit* supports you in...

* Battle/Combat management
* TODO Calculating dice rolls

Architectural Decisions
-----------------------
0. At the moment, *DungeonMasterToolkit* is an HTML file with embedded JavaScript, nothing more! (e.g. no database)
0. Due to teaching purposes this code has not the same level as production code
0. *DungeonMasterToolkit* supports only latest Firefox and latest Chrome
