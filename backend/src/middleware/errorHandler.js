const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  const message = err?.message || String(err);

  if (message === 'Project not found') {
    return res.status(404).json({
      error: message
    });
  }

  if (typeof message === 'string' && message.includes('Invalid status transition')) {
    return res.status(400).json({
      error: message
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? message : undefined
  });
};

module.exports = errorHandler;
