import Role from "./role";

class Harvester implements Role {

    run(creep: Creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            const targets = creep.room.find(FIND_SOURCES);

            if (targets.length > 0) {
                if (creep.harvest(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        } else {
            /**
             * Prioritize transferring energy to spawn, however if spawn is full,
             * use the stored energy to upgrade the room controller.
             */
            var spawn = Game.spawns["Spawn1"];
            if (spawn && (spawn.energy < spawn.energyCapacity)) {
                if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn);
                }
            } else {
                if (creep.room.controller) {
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
            }
        }


    }

}

export default new Harvester();
