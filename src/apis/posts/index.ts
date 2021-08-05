import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware";
import { validateComment } from "../../validation/posts/addComment";
import { validatePost } from "../../validation/posts/createPost";
import addComment from "./addComment";
import createPost from "./createPost";
import deleteComment from "./deleteComment";
import deletePost from "./deletePost";
import dislikePost from "./dislikePost";
import getPost from "./getPost";
import getPosts from "./getPosts";
import likePost from "./likePost";

const postsRouter = Router();

//@route   POST api/posts
//@desc    create post
//access   private

//@route   GET api/posts
//@desc    get posts
//access   public

postsRouter
  .route("/")
  .post(authMiddleware, validatePost(), createPost)
  .get(getPosts);

//@route   GET api/posts/:post_id
//@desc    get post by id
//access   public

//@route   DELETE api/posts/:post_id
//@desc    delete post by id
//access   private

postsRouter.route("/:post_id").get(getPost).delete(authMiddleware, deletePost);

//@route   GET api/posts/:post_id/like
//@desc    like post
//access   private

postsRouter.get("/:post_id/like", authMiddleware, likePost);

//@route   GET api/posts/:post_id/dislike
//@desc    dislike post
//access   private

postsRouter.get("/:post_id/dislike", authMiddleware, dislikePost);
//@route   POST api/posts/:post_id/comment
//@desc    comment on post
//access   private

postsRouter.post(
  "/:post_id/comment",
  authMiddleware,
  validateComment(),
  addComment
);

//@route   DELETE api/posts/:post_id/comment/:comment_id
//@desc    delete comment on post
//access   private

postsRouter.delete(
  "/:post_id/comment/:comment_id",
  authMiddleware,
  deleteComment
);

export default postsRouter;
