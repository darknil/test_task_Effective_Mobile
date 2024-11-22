export const validatePagination = (req, res, next) => {
  let { page, limit } = req.query

  page = parseInt(page, 10)
  limit = parseInt(limit, 10)

  if (isNaN(page) || page < 1) {
    return res.status(400).json({ error: 'Page must be a positive integer' })
  }

  if (isNaN(limit) || limit < 1) {
    return res.status(400).json({ error: 'Limit must be a positive integer' })
  }

  req.query.page = page
  req.query.limit = limit

  next()
}
