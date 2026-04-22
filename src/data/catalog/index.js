import { handguns } from './handguns.js';
import { revolvers } from './revolvers.js';
import { shotguns } from './shotguns.js';
import { boltActionRifles } from './bolt-action-rifles.js';
import { semiAutoRifles } from './semi-auto-rifles.js';
import { leverActionRifles } from './lever-action-rifles.js';
import { precisionAntiMateriel } from './precision-anti-materiel.js';
import { submachineGunsNfa } from './submachine-guns-nfa.js';
import { machineGunsNfa } from './machine-guns-nfa.js';
import { historicCollector } from './historic-collector.js';
import { modernMilitaryStyle } from './modern-military-style.js';
import { contemporaryPicks2026 } from './contemporary-picks-2026.js';
import { militaryDutyReference } from './military-duty-reference.js';

/** @type {import('../types.js').GunRow[]} */
export const allCatalogRows = [
  ...handguns,
  ...revolvers,
  ...shotguns,
  ...boltActionRifles,
  ...semiAutoRifles,
  ...leverActionRifles,
  ...precisionAntiMateriel,
  ...submachineGunsNfa,
  ...machineGunsNfa,
  ...historicCollector,
  ...modernMilitaryStyle,
  ...contemporaryPicks2026,
  ...militaryDutyReference,
];

export {
  handguns,
  revolvers,
  shotguns,
  boltActionRifles,
  semiAutoRifles,
  leverActionRifles,
  precisionAntiMateriel,
  submachineGunsNfa,
  machineGunsNfa,
  historicCollector,
  modernMilitaryStyle,
  contemporaryPicks2026,
  militaryDutyReference,
};
