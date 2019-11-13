import { ErrorMapper } from "utils/ErrorMapper";
import harvestRole from './roles/harvester';


// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  const MAIN_SPAWN = "Spawn1";
  const MIN_HARVESTERS = 3;
  const MIN_UPGRADERS = 1;

  // Check to make sure we have the minimum amount of each creep role, and if not, spawn more.
  var harvesters = _(Game.creeps).filter((c: Creep) => c.memory.role == 'harvester');

  if (harvesters.size() < MIN_HARVESTERS) {
    var status = Game.spawns[MAIN_SPAWN].spawnCreep([WORK, WORK, MOVE, CARRY], createRandomRoleName('Harvester'), { memory: { role: 'harvester' } });
    if (status == OK) {
      console.log('Spawned new harvester creep');
    }
  }

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      harvestRole.run(creep);
    }
  }

});

function createRandomRoleName(role: string): string {
  return role + '_' + (Math.floor(Math.random() * 65534) + 1)
}
