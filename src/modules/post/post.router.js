import { Router } from "express";
import { asyncHandler } from "../../middleWare/asyncHandler.js";
import { createComment, createPost, createReply, createShare, deleteComment, deletePost, deleteReply, deleteShare, getCommentsByPost, getLikedPosts, getPostById, getPosts, getPostsByCategory, getPostsByUser, getRepliesByComment, getSharedPosts, getSharesByPost, getUnlikedPosts, likeComment, likePost, likeReply, sharePost,  unlikesComment, unlikesPost, unlikesReply, updatePost } from "./post.controller.js";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
import { auth } from "../../middleWare/auth.js";
import { ROLES } from "../../constant.js";

const router = Router();


router.get('/get-post',auth([ROLES.admin]),asyncHandler(getPosts) )


router.use(auth([ROLES.user]))

router.post('/create-post', myMulter(multerValidation.image).array('image',5),HME,asyncHandler(createPost))
router.get('/get-post/:id',asyncHandler(getPostById))
router.put('/update-post/:id',asyncHandler(updatePost))
router.delete('/delete-post/:id',asyncHandler(deletePost))
router.patch('/like-post/:id',asyncHandler(likePost))
router.patch('/unlike-post/:id',asyncHandler(unlikesPost))
router.patch('/share-post/:id',asyncHandler(sharePost))
router.get('/liked-posts',asyncHandler(getLikedPosts))
router.get('/unliked-posts',asyncHandler(getUnlikedPosts))
router.get('/shared-posts',asyncHandler(getSharedPosts))
router.get('/get-posts-by-category/:category',asyncHandler(getPostsByCategory))
router.get('/get-posts-by-user/:userId',asyncHandler(getPostsByUser))
router.post('/create-comment/:postId',myMulter(multerValidation.image).single("image"),HME,asyncHandler(createComment))
router.get('/get-comments-by-post/:postId',asyncHandler(getCommentsByPost))
router.delete('/delete-comment/:id',asyncHandler(deleteComment))
router.post('/create-reply/:commentId',myMulter(multerValidation.image).single("image"),HME,asyncHandler(createReply))
router.get('/get-replies-by-comment/:commentId',asyncHandler(getRepliesByComment))
router.delete('/delete-reply/:id',asyncHandler(deleteReply))
router.patch('/like-comment/:id',asyncHandler(likeComment))
router.patch('/unlike-comment/:id',asyncHandler(unlikesComment))
router.patch('/like-reply/:id',asyncHandler(likeReply))
router.patch('/unlike-reply/:id',asyncHandler(unlikesReply))
router.post('/create-share/:postId',asyncHandler(createShare))
router.get('/get-shares-by-post/:postId',asyncHandler(getSharesByPost))
router.delete('/delete-share/:id',asyncHandler(deleteShare))


export default router;