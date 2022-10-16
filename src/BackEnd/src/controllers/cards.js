const mongoose = require("mongoose");
const cards = require("../models/Card");
/*-----------------------------post orders-----------------------------*/
exports.get_cards = async (req, res, next) => {
  try {
    const data = await cards.find().select("-__v");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: err });
  }
};
/*-----------------------------get all cards-----------------------------*/
exports.post_cards = async (req, res) => {
  try {
    const cards = new cards({
      _id: new mongoose.Types.ObjectId(),
      Instructor: req.body.nameinstructor,
      img: req.file.path,
      NameTeacher: req.body.NameTeacher,
      Module: req.body.nameModule,
      spantext1: req.body.nbrCourses,
      spantext2: req.body.nbrStudent,
      spantext3: req.body.nbrStar,
      
    });
    const data = await cards.save();
    return res.status(202).json({
      message: "Created cards successfuly",
      cards: {
        doc: data,
        request: {
          type: "GET",
          url: `http://localhost:3000/cards/${doc._id}`,
        },
      },
    });
  } catch (error) {
    res.status(404).send("${error}");
  }
};
/*-----------------------------patch a cards-----------------------------*/
exports.patch_cards = async (req, res, next) => {
  try {
    const id = req.params.cardsId;
    const data = await cards.findByIdAndUpdate(id, req.body, { new: true });
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(404).json("{$error");
  }
};
/*-----------------------------delete a cards-----------------------------*/
exports.delete_cards = async (req, res, next) => {
  try {
    const _id = req.params.delete;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No post with id: ${_id}`);
    const data = await cards.findByIdAndDelete({ _id: _id });
    return res.status(202).json({
      message: "cards deleted successfully.",
      cards_deleted: data,
    });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};
/*-----------------------------getting a cards by id-----------------------------*/

exports.get_cards_id = async (req, res, next) => {
  try {
    const id = req.params.cardsId;
    const data = await cards.findById(id).select("-__v");

    if (doc) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "invalid id" });
    }
  } catch (error) {
    res.status(500).json({
      error: err,
    });
  }
};
