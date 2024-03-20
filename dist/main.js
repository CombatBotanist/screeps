"use strict";
const interfaces = require("interfaces");
const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const { spawnCreep } = require("helpers");
module.exports.loop = function () {
    // Clear memory of dead creeps
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("Clearing non-existing creep memory:", name);
        }
    }
    // Spawn creeps if necessary
    let roles = {
        harvester: [],
        upgrader: [],
    };
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        roles[creep.memory.role].push(creep);
    }
    const roleQuotas = {
        harvester: 2,
        upgrader: 2,
    };
    if (roles.harvester.length < roleQuotas.harvester) {
        spawnCreep([WORK, CARRY, MOVE], "harvester", Game.spawns["Spawn1"]);
    }
    if (roles.upgrader.length < roleQuotas.upgrader) {
        spawnCreep([WORK, CARRY, MOVE], "upgrader", Game.spawns["Spawn1"]);
    }
    // Visualize spawning creeps
    if (Game.spawns["Spawn1"].spawning) {
        var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
        Game.spawns["Spawn1"].room.visual.text("🛠️" + spawningCreep.memory.role, Game.spawns["Spawn1"].pos.x + 1, Game.spawns["Spawn1"].pos.y, { align: "left", opacity: 0.8 });
    }
    // Run the role logic for each creep
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == "harvester") {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == "upgrader") {
            roleUpgrader.run(creep);
        }
    }
};
