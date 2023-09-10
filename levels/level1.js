let levelLength = 5;
let bgp = [];
let clouds = [];
let chicken = [];

const level1 = new Level(chicken,clouds,bgp,1440 * (levelLength - 1));

/**
 * Design the level by initializing background objects, clouds, and chickens.
 * This function sets up the background layers, clouds, chickens, and other level-specific elements.
 */
function levelDesign() {
    bgp.push(new BackgroundObject('img/5_background/layers/3_third_layer/full.png', -1440));
    bgp.push(new BackgroundObject('img/5_background/layers/2_second_layer/full.png', -1440));
    bgp.push(new BackgroundObject('img/5_background/layers/1_first_layer/full.png', -1440));

    for (let i = 0; i < levelLength; i++) {
        bgp.push(new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 1440 * i));
        bgp.push(new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 1440 * i));
        bgp.push(new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 1440 * i));

    }

    for (let i = 0; i < levelLength; i++) {
        clouds.push(new Cloud(1440 * i));
        chicken.push(new Chicken(1440 * (i+1)))
        chicken.push(new BabyChicken(1440 * (i+1)))
    }
}