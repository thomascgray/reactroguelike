# reactroguelike

its a roguelike made in react. incomprehensibly WIP


# level design and consistency

rooms should be 7x7, probably? with doors in the cross sections being 2 tiles wide


# dealing with assets

## scaling

they're all 16x16 which is a little small, but its no worries

get image magick installed, then run

`magick mogrify -scale 300% <path>/*.png`

this will enlarge them all in place to 48x48, and can then be used for whatever