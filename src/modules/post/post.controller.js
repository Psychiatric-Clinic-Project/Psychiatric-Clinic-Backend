import { uploadFile } from "../../services/uploadFile.js";
import {
  createdSuccessfullyMessage,
  deletedSuccessfullyMessage,
  notFoundMessage,
  retrievedSuccessfullyMessage,
  updatedSuccessfullyMessage,
} from "../../utils/index.js";
import Post from "../../../database/models/post.model.js";

export const createPost = async (req, res) => {
  const { text, category } = req.body;
  const userId = req.user._id;
  let paths = [];
  for (let i of req.files) {
    const secure_url = await uploadFile(i.path);
    paths.push(secure_url);
  }
  const newPost = await Post.create({
    userId,
    text,
    image: paths,
    category,
  });
  return res.success(newPost, createdSuccessfullyMessage("Post"), 201);
};

// as i saw in the post model there is an attribute called category, which should we retrieve posts depnding on its?
export const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  return res.success(posts, retrievedSuccessfullyMessage("Posts"), 200);
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    return res.error(notFoundMessage("Post"), 404);
  }
  return res.success(post, retrievedSuccessfullyMessage("Post"), 200);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { text, category } = req.body;
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      text,
      category,
    },
    { new: true }
  );
  if (!updatedPost) {
    return res.error(notFoundMessage("Post"), 404);
  }
  return res.success(updatedPost, updatedSuccessfullyMessage("Post"), 200);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.findByIdAndDelete(id);
  if (!deletedPost) {
    return res.error(notFoundMessage("Post"), 404);
  }
  return res.success(deletedPost, deletedSuccessfullyMessage("Post"), 200);
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(
    id,
    {
      $addToSet: { likes: req.user._id },
      $pull: { unlikes: req.user._id },
    },
    { new: true }
  );
  if (!post) {
    return res.error(notFoundMessage("Post"), 404);
  }
  return res.success(post, updatedSuccessfullyMessage("Post"), 200);
};

export const unlikesPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(
    id,
    {
      $addToSet: { unlikes: req.user._id },
      $pull: { likes: req.user._id },
    },
    { new: true }
  );
  if (!post) {
    return res.error(notFoundMessage("Post"), 404);
  }
  return res.success(post, updatedSuccessfullyMessage("Post"), 200);
};

export const sharePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(
    id,
    {
      $addToSet: { shares: req.user._id },
    },
    { new: true }
  );
  if (!post) {
    return res.error(notFoundMessage("Post"), 404);
  }
  return res.success(post, updatedSuccessfullyMessage("Post"), 200);
};

export const getLikedPosts = async (req, res) => {
  const userId = req.user._id;
  const likedPosts = await Post.find({ likes: { $in: [userId] } });
  return res.success(
    likedPosts,
    retrievedSuccessfullyMessage("Liked Posts"),
    200
  );
};

export const getUnlikedPosts = async (req, res) => {
  const userId = req.user._id;
  const unlikesdPosts = await Post.find({ unlikess: { $in: [userId] } });
  return res.success(
    unlikesdPosts,
    retrievedSuccessfullyMessage("Unliked Posts"),
    200
  );
};

export const getSharedPosts = async (req, res) => {
  const userId = req.user._id;
  const sharedPosts = await Post.find({ shares: { $in: [userId] } });
  return res.success(
    sharedPosts,
    retrievedSuccessfullyMessage("Shared Posts"),
    200
  );
};

export const getPostsByCategory = async (req, res) => {
  const { category } = req.params;
  const posts = await Post.find({ category });
  return res.success(
    posts,
    retrievedSuccessfullyMessage("Posts by Category"),
    200
  );
};

export const getPostsByUser = async (req, res) => {
  const { userId } = req.params;
  const posts = await Post.find({ userId });
  return res.success(posts, retrievedSuccessfullyMessage("Posts by User"), 200);
};

// =====================comment====================================

export const createComment = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
  let image;
  if (req.file) {
    image = await uploadFile(req.file.path);
  }
  const userId = req.user._id;
  const newComment = await Comment.create({
    userId,
    postId,
    text,
    image,
  });
  return res.success(newComment, createdSuccessfullyMessage("Comment"), 201);
};

export const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId });
  return res.success(
    comments,
    retrievedSuccessfullyMessage("Comments by Post"),
    200
  );
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const deletedComment = await Comment.findByIdAndDelete(id);
  if (!deletedComment) {
    return res.error(notFoundMessage("Comment"), 404);
  }
  return res.success(
    deletedComment,
    deletedSuccessfullyMessage("Comment"),
    200
  );
};

export const likeComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndUpdate(
    id,
    {
      $addToSet: { likes: req.user._id },
      $pull: { unlikes: req.user._id },
    },
    { new: true }
  );
  if (!comment) {
    return res.error(notFoundMessage("Comment"), 404);
  }
  return res.success(comment, updatedSuccessfullyMessage("Comment like"), 200);
};

export const unlikesComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndUpdate(
    id,
    {
      $addToSet: { unlikes: req.user._id },
      $pull: { like: req.user._id },
    },
    { new: true }
  );
  if (!comment) {
    return res.error(notFoundMessage("Comment"), 404);
  }
  return res.success(
    comment,
    updatedSuccessfullyMessage("Comment unlikes"),
    200
  );
};

// =====================reply====================================

export const createReply = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  let image;
  if (req.file) {
    image = await uploadFile(req.file.path);
  }
  const userId = req.user._id;
  const newReply = await Response.create({
    userId,
    commentId,
    text,
    image,
  });
  return res.success(newReply, createdSuccessfullyMessage("Reply"), 201);
};

export const getRepliesByComment = async (req, res) => {
  const { commentId } = req.params;
  const replies = await Response.find({ commentId });
  return res.success(
    replies,
    retrievedSuccessfullyMessage("Replies by Comment"),
    200
  );
};

export const deleteReply = async (req, res) => {
  const { id } = req.params;
  const deletedReply = await Response.findByIdAndDelete(id);
  if (!deletedReply) {
    return res.error(notFoundMessage("Reply"), 404);
  }
  return res.success(deletedReply, deletedSuccessfullyMessage("Reply"), 200);
};

export const likeReply = async (req, res) => {
  const { id } = req.params;
  const reply = await Response.findByIdAndUpdate(
    id,
    {
      $addToSet: { likes: req.user._id },
      $pull: { unlikes: req.user._id },
    },
    { new: true }
  );
  if (!reply) {
    return res.error(notFoundMessage("Reply"), 404);
  }
  return res.success(reply, updatedSuccessfullyMessage("Reply like"), 200);
};

export const unlikesReply = async (req, res) => {
  const { id } = req.params;
  const reply = await Response.findByIdAndUpdate(
    id,
    {
      $addToSet: { unlikes: req.user._id },
      $pull: { likes: req.user._id },
    },
    { new: true }
  );
  if (!reply) {
    return res.error(notFoundMessage("Reply"), 404);
  }
  return res.success(reply, updatedSuccessfullyMessage("Reply unlikes"), 200);
};

export const createShare = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $addToSet: { shares: req.user._id },
    },
    { new: true }
  );
  if (!post) {
    return res.error(notFoundMessage("Post"), 404);
  }
  return res.success(newShare, createdSuccessfullyMessage("Share"), 200);
};

export const getSharesByPost = async (req, res) => {
  const { postId } = req.params;
  const shares = await Post.findById(postId).populate('shares');
  return res.success(
    shares,
    retrievedSuccessfullyMessage("Shares by Post"),
    200
  );
};

export const deleteShare = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(
    id,
    { $pull: { shares: req.user._id } },
    { new: true }
  );
  if (!post) {
    return res.error(notFoundMessage("Post"), 404);
  }
  return res.success(deletedShare, deletedSuccessfullyMessage("Share"), 200);
};
