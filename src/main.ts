var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
const { spawnCreep } = require('helpers');

module.exports.loop = function () {
  // Clear memory of dead creeps
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  // Spawn creeps if necessary
  interface CreepMemory {
    role: string;
  }
  let roles: { [key: string]: Creep[] } = {
    harvester: [],
    upgrader: []
  }
  for (const name in Game.creeps) {
    console.log(name);
    const creep: Creep = Game.creeps[name];
    console.log(creep.memory.role);
    roles[(creep.memory as CreepMemory).role].push(creep);
  }

  const roleQuotas: { [key: string]: number } = {
    harvester: 2,
    upgrader: 1
  }
  if (roles.harvester.length < roleQuotas.harvester && Game.spawns['Spawn1'].spawning === null) {
    spawnCreep([WORK, CARRY, MOVE], 'harvester');
  }

  // Visualize spawning creeps
  if (Game.spawns['Spawn1'].spawning) {
    var spawningCreep: any = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      Game.spawns['Spawn1'].pos.x + 1,
      Game.spawns['Spawn1'].pos.y,
      { align: 'left', opacity: 0.8 });
  }

  // Run the role logic for each creep
  for (var name in Game.creeps) {
    var creep: any = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
  }
}