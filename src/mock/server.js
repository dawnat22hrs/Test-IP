const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/mock/db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

server.use(middlewares);
server.use(bodyParser.json());

const submittedDestinations = new Set();

function checkAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Missing Authorization header' });

  next();
}

server.post('/v1/withdrawals', checkAuth, (req, res) => {
  const { destination } = req.body;

  if (submittedDestinations.has(destination)) {
    return res.status(409).json({ message: 'Withdrawal already exists' });
  }
  const db = router.db;
  const withdrawals = db.get('withdrawals');

  const newId = withdrawals.value().length
    ? Math.max(...withdrawals.value().map((w) => w.id)) + 1
    : 1;

  const newItem = { id: newId, ...req.body, status: 'pending' };
  withdrawals.push(newItem).write();

  submittedDestinations.add(destination);

  res.status(201).json({ id: newId });
});

server.get('/v1/withdrawals/:id', checkAuth, (req, res) => {
  const db = router.db;
  const id = Number(req.params.id);
  const item = db.get('withdrawals').find({ id }).value();

  if (!item) return res.status(404).json({ message: 'Not found' });

  res.json(item);
});

server.use(
  '/v1',
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  router,
);

server.listen(4000, () => {
  console.log('Mock server running on http://localhost:4000/v1');
});
