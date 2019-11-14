import Role from "./role";

class Upgrader implements Role {

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
            if (creep.room.controller) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }


    }

}

export default new Upgrader();
