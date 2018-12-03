# reactroguelike

its a roguelike made in react. incomprehensibly WIP


# start

`npm i`

`npm start`

# storybook

theres a storybook setup for showing off different components

you can run it with

`npm run storybook`


# glossary


### stage

the main world that the game takes place in. tiles, a player, enemies, etc.

### player

the `stageObject` that moves when the user presses keys.

### stageObject

things that exist in the physical stage. they have positions, can be collidable, etc.

### enemy

something the player can attack. has AI. has HP, items, etc. is an effective subset of `stageObject`

### stageProp

physical things that exist in the world, but doesn't have any AI. is an effective subset of `stageObject`

### loot

chests, etc. things designed specifically for holding items.

TODO can be removed, is actually just a `stageProp` under a different name



# level design and consistency

rooms should be 7x7, probably? with doors in the cross sections being 2 tiles wide


# dealing with assets

## scaling

they're all 16x16 which is a little small, but its no worries

get image magick installed, then run

`magick mogrify -scale 300% <path>/*.png`

this will enlarge them all in place to 48x48, and can then be used for whatever