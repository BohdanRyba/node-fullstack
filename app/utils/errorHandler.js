module.exports = (response, error) => {
  response.status(500).json({
    status: 'error',
    message: error ? error.message : error
  })
}