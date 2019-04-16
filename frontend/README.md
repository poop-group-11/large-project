# Graphics

## Files

The code for the front end is split for ease of understanding and development. The load order and description of each follows:

* index.html - Primary HTML file, contains the structure of the webpage.
* style.css - Stylesheet that makes our HTML look nice.
* config.js - Used to set and quickly configure global variables used across several files.
* fishAssets.js - Defines an array of fishAssets that contain the <img> information for moving left and right.
* fish.js - Defines a fish object
* hook.js - Defines a hook object
* game.js - Contains formal game logic

### index.html
This is a relatively standard HTML file, its split into two major <div> tags. The home-screen which is the first screen a user sees when opening the webpage. Displays the logo and gives the option to start a new game, adjust settings or lookup a user. The game-screen contains the canvas that we draw our animations onto. We then load our JavaScript at the end of the body to make sure everything else loads before it tries to execute. The music is also loaded at the end of the body for better load times.

### style.css
This stylesheet is pretty messy, contains styling for all the elements found in the html. Should probably be restructured.

### config.js
Currently defines our global canvas and context variables for manipulating objects on the canvas. The amount of fish that can be drawn at one time, the amount of players, and the catch line for the hooks. I expect the amount of players will be changed once we implement joining through websockets and we should look into adjusting the catch line to the screen size rather than a static value.

### fishAssets.js
Sets up a data structure that allows us to pull both the left and right sprite of a fish from an array at random. Current implementation is a bit messy, as we have to manually input info about new fish sprites.

### fish.js
Defines a fish object with the following attributes:

* id - a unique id given to each fish used to identify which is hooked by a player.
* img - right-facing img asset.
* imgleft - left-facing img asset.
* width - width of the img asset. (Seems redundant and can probably be removed)
* height - height of the img asset. (Seems redundant and can probably be removed)
* x - x coordinate of the top left of the hitbox.
* y - y coordinate of the top left of the hitbox.
* dX - The velocity of the fish in the x direction, how many pixels it moves per frame.
* dY - The velocity of the fish in the y direction, how many pixels it moves per frame.
* hooked - ID of the hook the fish is attached to, if not attached to a hook it is set to -1.
* right - Current direction of the fish, moving right if true, left if false.

Also contains the following methods:

* respawn() - Resets location of fish, asset the fish is using, size of fish to match new asset.
* move() - Logic for moving, moves according to its own dX and dY values while not hooked, otherwise just matches its hook.
* draw() - Draws the fish onto the canvas with the correct asset based on its state. Draws rotated if it is hooked.
* changeDir() - Randomizes current fish movement information. Currently not called need to figure out a good balance of when to change direction.

### hook.js
Defines a hook object with the following attributes:

* id - a unique id given to each hook used to identify which player they are.
* img - img asset for the hook.
* width - width of the img asset. (Seems redundant and can probably be removed)
* height - height of the img asset. (Seems redundant and can probably be removed)
* origin - initial position of the hook from which the fishing line originates.
* length - length of the fishing line.
* dL - rate at which the length changes.
* x - x coordinate of the top left of the hitbox.
* y - y coordinate of the top left of the hitbox.
* hooked - ID of the fish the hook is attached to, if not attached to a fish it is set to -1.
* score - Score of the player using this hook.

Also contains the following methods.

* draw() - Draws the hook onto the canvas. Also draws a line from the top of the screen to the hook as well as drawing the players score / other information.
* move() - Logic for moving, moves according to dY value. Cannot cross top or bottom of screen.
* catch() - Logic for catching a fish, if a fish is hooked and the hook crosses the waterTop threshold the player gets points.

### game.js
Creates the fish and hook objects for gameplay and resizes canvas to screen size. Contains the following methods:

* drawHooks() - Iterates through list of hooks performing their methods for moving, drawing, and catching.
* drawFish() - Iterates through list of fish performing their methods for moving, and drawing.
* collide(hook, fish) - Checks if the rectangular hitboxes of a fish and a hook have collided and if they have attach the two.
* collision() - Iterates through every combination of hook and fish to check for collision, probably not the most performant option and could be reconsidered.
* draw() - Core function of the game, repeatedly resizes canvas according to window, clears the canvas, and calls the other functions of game.js. Is repeatedly called using [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
