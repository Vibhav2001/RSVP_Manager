import express from 'express';
import cors from 'cors';
import { RsvpService } from './rsvpService';
import { ConsoleLogger } from './logger';
import { Player, RSVPStatus } from './types';

const app = express();
const port = 3000;
const logger = new ConsoleLogger();
const rsvpService = new RsvpService(logger);

app.use(cors());
app.use(express.json());

app.post('/api/rsvp', (req, res) => {
  const { id, name, status }: { id: string; name: string; status: RSVPStatus } = req.body;
  if (!id || !name || !status) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  rsvpService.addOrUpdateRsvp({ id, name }, status);
  res.status(200).json({ message: 'RSVP updated' });
});

app.get('/api/confirmed', (_req, res) => {
  res.json(rsvpService.getConfirmedAttendees());
});

app.get('/api/counts', (_req, res) => {
  res.json(rsvpService.countRsvps());
});

app.get('/api/all', (_req, res) => {
  res.json(rsvpService.getAllRsvps());
});

app.listen(port, () => {
  logger.log(`Server running at http://localhost:${port}`);
});