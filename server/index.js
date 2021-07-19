import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import index from './routes';

require('express-async-errors');

const app = express();

const port = process.env.PORT || 8000;
app.set('port', port);

app.use(cors());
app.use(logger('dev'));

app.use(express.json());

app.use('/api/v1', index);

app.use((err, req, res, next) => {
  if (err.parent && err.parent.errno === 'ECONNREFUSED') {
    return res.status(500).json({
      success: false,
      message: 'connection error'
    });
  }

  return res.status(400).json({
    success: false,
    message: err.errors ? err.errors[0].message : err.message
  });
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

export default app;
