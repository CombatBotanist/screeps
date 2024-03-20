exports.spawnCreep = (body: BodyPartConstant[], role: string, spawner: StructureSpawn) => {
    if (spawner.spawning) return;
    if (spawner.room.energyAvailable < exports.bodyCost(body)) return;
    var name = `${role}_${Game.time}`
    console.log(`Spawning new ${role}: ${name}`);
    Game.spawns['Spawn1'].spawnCreep(body, name,
        { memory: { role } });
}

exports.bodyCost = (body: BodyPartConstant[]) => {
    let sum = 0;
    for (let i in body)
        sum += BODYPART_COST[body[i]];
    return sum;
}