export default function (player) {
    // TODO depending on the player archetype give them different starting equipment
    // TODO probably do different scripts for this e.g run witch.js for witches to avoid disgusting switch

    const playerArchetype = player.HasArchetype.getArchetype();

    const initialiserScript = require(`./Scripts/InitialArchetypeSetups/${playerArchetype}`).default

    initialiserScript(player);
}