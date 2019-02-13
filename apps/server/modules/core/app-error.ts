import { logger } from './logger';

export const clientErrorHandler = (error, req, res, next) => {
  if (error instanceof AppHttpError) {
    return res
      .status((<AppHttpError>error).httpCode)
      .send({ error: error.message });
  }

  const { correlationId } = logger.log('error', 'Express Middleware %s', error);
  console.log('[logErrors]', error, correlationId);

  if (req.xhr) {
    res.status(500).send({ correlationId });
  } else {
    next(correlationId);
  }
};

export const errorHandler = (correlationId, req, res, next) => {
  res.status(500).send({ correlationId });
  // res.status(500);
  // res.render('error', { error: err });
};

export const async = (fn) => (req, res, next, ...args) =>
  Promise.resolve(fn(req, res, next, ...args)).catch(next);

export const asyncAll = (fns) => fns.map((fn) => async(fn));

export const compose = (middlewares) =>
  middlewares.reduce((a, b) => (req, res, next) =>
    a(req, res, (err: any) => (err ? next(err) : b(req, res, next)))
  );

export class AppError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class AppHttpError extends AppError {
  
  constructor(public httpCode, message: string) {
    super(message);
    Object.setPrototypeOf(this, AppHttpError.prototype);
  }
}
