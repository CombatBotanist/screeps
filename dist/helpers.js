"use strict";
exports.spawnCreep = (body, role) => {
    var name = `${role}_${Game.time}`;
    console.log(`Spawning new ${role}: ${name}`);
    Game.spawns['Spawn1'].spawnCreep(body, name, { memory: { role } });
};
