const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User.js')
const keys = require('../../../config/keys')
const errorHandler = require('../../utils/errorHandler')
module.exports.login = async function (req, res) {

  const candidate = await User.findOne({email: req.body.email})
  if (candidate) {

    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

    if (passwordResult) {
      //token generating + password compared
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt_key, {expiresIn: 60 * 60 * 24})
      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json('Данные введены неверно, попробуйте снова')
    }
  } else {
    res.status(404).json('Пользователя не существует, пожалуйста зарегистрируйтесь')
  }
}

module.exports.register = async function (req, res) {

  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    res.status(409).json({
      message: {
        status: 'error',
        message: 'Conflict!!! User exist'
      }
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const pass = req.body.password

    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(pass, salt),
    })

    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      errorHandler(res, e)
    }
  }
}