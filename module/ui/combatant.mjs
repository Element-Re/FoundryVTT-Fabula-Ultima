import { FRIENDLY, HOSTILE } from './combat.mjs';
import { NpcDataModel } from '../documents/actors/npc/npc-data-model.mjs';

Hooks.on('preCreateCombatant', function (document, data, options, userId) {
	if (document instanceof FUCombatant && document.actorId === null) {
		ui.notifications.info('FU.CombatTokenWithoutActor', { localize: true });
		return false;
	}
});

/**
 * @typedef Combatant
 * @property {Number} id
 * @property {Number} actorId
 * @property {FUActor} actor
 * @property {TokenDocument} token
 * @property {Boolean} isNPC
 * @property {Boolean} visible
 * @property {Boolean} isDefeated
 * @remarks {@link https://foundryvtt.com/api/classes/client.Combatant.html}
 */

/**
 * @extends Combatant
 * @inheritDoc
 */
export class FUCombatant extends Combatant {
	/**
	 * @return {"friendly" | "hostile"}
	 */
	get faction() {
		return this.token?.disposition === foundry.CONST.TOKEN_DISPOSITIONS.FRIENDLY ? FRIENDLY : HOSTILE;
	}

	/**
	 * @return number
	 */
	get totalTurns() {
		if (this.token?.actor && this.token.actor.system instanceof NpcDataModel) {
			return this.token.actor.system.rank.replacedSoldiers;
		}
		return 1;
	}
}
