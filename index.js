
const   icon_width = 79,
        icon_height = 79,
        // number of icons in the reel
        num_icons = 9,
        time_per_icon = 100,
        // array of icons indexes
        indexes = [0, 0, 0];

        // function to animate reel that can be repeated over the three reels
const roll = (reel, offset = 0) => {
    // delta is the amount of rotations of the reel
    // minimum of 18 icons + a rounded number of random moves of the icon
    // (offset + 2) adds on to each reel
    const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
    const style = getComputedStyle(reel),
            backgroundPositionY = parseFloat(style["background-position-y"]);

            reel.style.transition = `background-position-y ${8 +delta * time_per_icon}ms`;
            reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`
};

function rollAll() {
    const reelsList = document.querySelectorAll('.slots > .reel');
    // spread operator turning reelsList into an array, so we can map over the list
    [...reelsList].map((reel, i) => {
        console.log(reel, i)
        roll(reel, i)
    })
}

rollAll();