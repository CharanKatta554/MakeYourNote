module.exports = (sequelize, Sequelize) => {
  const Note = sequelize.define("notes", {
    user_id: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Note;
};