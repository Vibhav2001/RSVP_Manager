import { Player, RsvpEntry, RSVPStatus } from './types';
import { Logger } from './logger';

export class RsvpService {
  private rsvpMap: Map<string, RsvpEntry> = new Map();
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  addOrUpdateRsvp(player: Player, status: RSVPStatus): void {
    this.rsvpMap.set(player.id, { player, status });
    this.logger.log(`RSVP updated for ${player.name}: ${status}`);
  }

  getConfirmedAttendees(): Player[] {
    return Array.from(this.rsvpMap.values())
      .filter(entry => entry.status === 'Yes')
      .map(entry => entry.player);
  }

  countRsvps(): {
    total: number;
    confirmed: number;
    declined: number;
    maybe: number;
  } {
    let confirmed = 0;
    let declined = 0;
    let maybe = 0;

    for (const entry of this.rsvpMap.values()) {
      switch (entry.status) {
        case 'Yes':
          confirmed++;
          break;
        case 'No':
          declined++;
          break;
        case 'Maybe':
          maybe++;
          break;
      }
    }

    return {
      total: this.rsvpMap.size,
      confirmed,
      declined,
      maybe,
    };
  }

  getAllRsvps(): RsvpEntry[] {
    return Array.from(this.rsvpMap.values());
  }
}