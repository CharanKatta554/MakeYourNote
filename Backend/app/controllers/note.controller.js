const jwt = require("jsonwebtoken")
const db = require("../models");
const Note = db.notes;

exports.createNote = async (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.replace(/Bearer\s+/, '')
  const userToken = jwt.decode(token)
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const note = {
    user_id: userToken.results.id,
    title: req.body.title,
    description: req.body.description
  }
  const results = await Note.create(note);
  res.send(results);
};

exports.findAllNotes = async (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.replace(/Bearer\s+/, '')
  const userToken = jwt.decode(token)
  if (userToken != null) {
    Note.findAll({ where: { user_id: userToken.results.id } }).then(data => {
      res.send(data);
    })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving notes."
        });
      });;
  }
  else {
    res.status(500).send({
      message: "Invalid user."
    });
  }

};

exports.findNote = async (req, res) => {
  const title = req.params.title;
  const note = Note.findByPk(title)
  res.send(note)
}

exports.deleteNote = (req, res) => {
  const id = req.params.id;
  Note.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Note was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Note with id=${id}. Maybe Note was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Note with id=" + id
      });
    });
}

