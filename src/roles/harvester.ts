import Role from "./role";

class Harvester implements Role {

    run(creep: Creep) {

        if (creep.memory.state == undefined) {
            creep.memory.state = 'harvesting'
        }

        if (creep.memory.state == 'upgrading' && creep.carry.energy == 0) {
            creep.memory.state = "harvesting";
            creep.say('⚡️ Gathering Energy');
        }

        if (creep.memory.state == 'harvesting' && (creep.carry.energy >= creep.carryCapacity)) {
            creep.memory.state = 'upgrading';
            creep.say('🔆 Upgrading')
        }

        if (creep.memory.state == 'harvesting') {
            const targets = creep.room.find(FIND_SOURCES);

            if (targets.length > 0) {
                if (creep.harvest(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        } else if (creep.memory.state == 'upgrading') {
            /**
             * Prioritize transferring energy to spawn, however if spawn is full,
             * use the stored energy to upgrade the room controller.
             */
            var spawn = Game.spawns["Spawn1"];
            if (spawn) {
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
