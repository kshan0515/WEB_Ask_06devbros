const Comment = require('../models/comment');

// ======== Comment 주인 미들웨어 =======

const commentAuthorize = async (req, res, next) => {
  try {
    const commentId = req.params.commentid;
    const comment = await Comment.findById(commentId);
    if(!comment) {
        return res.status(400).json({
            message: "No Comment"
        });
    }
    else {
        if(comment.user._id.toString() !== req.userData._id.toString()) {
            return res.status(401).json({
                message: "Auth Failed"
            });
        } else {
            req.commentData = comment;
            next();
        }
    }
  } catch (e) {
    return res.status(401).json({
        message: "Auth Failed"
    });
  }
};

module.exports = commentAuthorize;
