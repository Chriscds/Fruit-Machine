const debugEl = document.getElementById('debug'),

    icon_width = 79,
    icon_height = 79,
        // number of icons in the reel
    num_icons = 9,
    time_per_icon = 100,
        // array of icons indexes
    indexes = [0, 0, 0],
    iconMap = ["Banana", "Seven","Cherries", "Plum", "Orange", "Bell", "Bar", "Lemon", "Melon"];

        // function to animate reel that can be repeated over the three reels
const roll = (reel, offset = 0) => {
        // delta is the amount of rotations of the reel
        // minimum of 18 icons + a rounded number of random moves of the icon
        // (offset + 2) adds on to each reel
    const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
    const style = getComputedStyle(reel),
            backgroundPositionY = parseFloat(style["background-position-y"]),
            targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
            normTargetBackgroundPositionY = targetBackgroundPositionY%(num_icons * icon_height);

    return new Promise((resolve, reject) => {

            reel.style.transition = `background-position-y ${8 +delta * time_per_icon}ms cubic-bezier(.45,.05,.58,1.09)`;
            reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`

            setTimeout(() => {
                reel.style.transition = `none`;
                reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
                resolve(delta%num_icons)
        }, 8 + delta * time_per_icon)
    })
};

function rollAll() {

    debugEl.textContent = 'Rolling...';

    const reelsList = document.querySelectorAll('.slots > .reel');

    Promise
        .all( [...reelsList].map((reel, i) => roll(reel, i)) )
        .then((deltas) => {
            deltas.forEach((delta, i) => indexes[i] =(indexes[i] + delta)%num_icons);
            debugEl.textContent = indexes.map((i) => iconMap[i]).join(' - ');
        //    indexes.map((index) => {console.log(iconMap[index]) })

            			// Win conditions
			if (indexes[0] == indexes[1] || indexes[1] == indexes[2]) {
				const winCls = indexes[0] == indexes[2] ? "win2" : "win1";
				document.querySelector(".slots").classList.add(winCls);
				setTimeout(() => document.querySelector(".slots").classList.remove(winCls), 2000)
			}
		
			// Again!
			setTimeout(rollAll, 3000);
		});
};

// Kickoff
setTimeout(rollAll, 1000);