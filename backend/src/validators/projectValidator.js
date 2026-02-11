const { z } = require('zod');

const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  clientName: z.string().min(1, 'Client name is required'),
  status: z.enum(['active', 'on_hold', 'completed'], {
    errorMap: () => ({ message: 'Status must be active, on_hold, or completed' })
  }),
  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Priority must be low, medium, or high' })
  }).default('medium'),
  startDate: z.string().refine((date) => {
    return !isNaN(Date.parse(date));
  }, 'Start date must be a valid ISO date string'),
  endDate: z.string().optional().refine((date) => {
    if (!date) return true;
    return !isNaN(Date.parse(date));
  }, 'End date must be a valid ISO date string'),
  notes: z.string().optional()
}).refine((data) => {
  if (!data.endDate) return true;
  return new Date(data.endDate) >= new Date(data.startDate);
}, {
  message: 'End date must be greater than or equal to start date',
  path: ['endDate']
});

const updateStatusSchema = z.object({
  status: z.enum(['active', 'on_hold', 'completed'], {
    errorMap: () => ({ message: 'Status must be active, on_hold, or completed' })
  })
});

const querySchema = z.object({
  status: z.enum(['active', 'on_hold', 'completed']).optional(),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'startDate']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.string().transform(Number).pipe(z.number().int().positive()).default('1'),
  limit: z.string().transform(Number).pipe(z.number().int().positive().max(100)).default('10')
});

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const data = schema.parse(req.method === 'GET' ? req.query : req.body);
      if (req.method === 'GET') {
        req.query = data;
      } else {
        req.body = data;
      }
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors?.map(err => ({
            field: err.path?.join('.') || 'unknown',
            message: err.message
          })) || []
        });
      }
      next(error);
    }
  };
};

module.exports = {
  createProjectSchema,
  updateStatusSchema,
  querySchema,
  validate
};
