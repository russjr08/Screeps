import Role from "./role";

class Upgrader implements Role {

    run(creep: Creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            const targets = creep.room.find(FIND_SOURCES);

            if (targets.length > 0) {
                if (creep.harvest(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
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

export default new Upgrader();
