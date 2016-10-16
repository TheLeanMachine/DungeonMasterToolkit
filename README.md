DungeonMasterToolkit *alpha*
============================

*DungeonMasterToolkit* is a JavaScript application thats supports a Dungeon Master during an Pen-and-Paper session (offline and online).

ToDOs
-----
0. Rename  `Character` to `Hero`
0. Create module for rule engine (clients should not know implementation details of, for example, the 'Character' "class")
0. Use async file loading (modularization)
0. Add unit tests (e.g. domain model "class", type-checking helper functions, ...)
0. MongoLab!
0. Refactor handling of invalid form input: Print errors in UI. Don't log erros on console...
0. Provide factory method for creating characters (or objects in general?! See Crockford's `object(o)` function)
0. Prefill the input field for the character name with random names (to speed up character generation)
0. A `Character` should have a `CharacterClass` property, or not?
0. Filter input of Character Generator's text field (e.g. prone to XSS attacks?)
0. Create GitHub page for this project, if it can be used to serve app.html  (see http://pages.github.com/)
0. Set up automated build infrastructure (JSLint, Auto-Format, Unit-Tests, Minify, ...)
0. Configure travis-ci.org


How does it help?
-----------------
*DungeonMasterToolkit* supports you in...

* Battle/Combat management
    * Goal: Design an API that can handle multiple rule systems ("Advanced Dungeons and Dragons", "Das schwarze Auge", ...)
    * This top-level API defines [a facade](http://en.wikipedia.org/wiki/Facade_pattern "the Facade pattern") that serves our core use cases
    * We implement this API through a conrete rule engine, let's say ADnD first
    * Each rule engine is developed ["BDD style"](http://en.wikipedia.org/wiki/Behavior-driven_development), writing tests with [jasmine](https://jasmine.github.io/)
    * We need...
         * Characters (Heroes)
         * Monsters
         * Damage dealing/Life resource
         * A concept for "organizing hero actions" (Rounds, Initiative)
    * Be minimal! (no use crafting something that noone needs)
* TODO Calculating dice rolls

Architectural Decisions
-----------------------
0. At the moment, *DungeonMasterToolkit* is an HTML file with embedded JavaScript, nothing more! (e.g. no database)
0. Due to teaching purposes this code has not the same level as production code
0. *DungeonMasterToolkit* supports only latest Firefox and latest Chrome


