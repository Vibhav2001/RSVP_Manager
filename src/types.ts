export type RSVPStatus = 'Yes' | 'No' | 'Maybe';

export interface Player {
  id: string;
  name: string;
}

export interface RsvpEntry {
  player: Player;
  status: RSVPStatus;
}