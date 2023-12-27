import { Router } from 'express';

const router = new Router();

// Test-Route
router.get('/test', (req, res) => {
  res.send('Test ist erfolgreich :)');
});

// Routen:
// router.post('/entry/create', createEntry);

export default router;
