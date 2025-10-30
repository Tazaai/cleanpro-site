import { z } from 'zod';

/**
 * Zod validation middleware
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {string} source - Request property to validate ('body', 'query', 'params')
 * @returns {Function} Express middleware function
 */
export const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const data = req[source];
      const validated = schema.parse(data);
      req.validated = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          ok: false,
          error: 'Validation failed',
          details: error.errors?.map(err => ({
            field: err.path?.join('.') || 'unknown',
            message: err.message,
            code: err.code
          })) || []
        });
      }
      
      return res.status(500).json({
        ok: false,
        error: 'Internal validation error'
      });
    }
  };
};