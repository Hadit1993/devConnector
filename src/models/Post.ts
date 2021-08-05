import { PopulatedDoc, Document, Schema, Model, model } from "mongoose";
import { User } from "./User";

interface IPost {
  user?: PopulatedDoc<User & Document>;
  text: string;
  name?: string;
  avatar?: string;
  likes: { user: PopulatedDoc<User & Document> }[];
  dislikes: { user: PopulatedDoc<User & Document> }[];
  comments: {
    user: PopulatedDoc<User & Document>;
    text: string;
    name?: string;
    avatar?: string;
    date?: Date;
  }[];

  date: Date;
}

const PostSchema = new Schema<IPost, Model<IPost>, IPost>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  text: {
    type: String,
    required: true,
  },

  name: {
    type: String,
  },

  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  dislikes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      text: {
        type: String,
        required: true,
      },

      name: {
        type: String,
      },

      avatar: {
        type: String,
      },

      date: {
        type: Date,
        default: new Date(),
      },
    },
  ],

  date: {
    type: Date,
    default: new Date(),
  },
});

const Post = model<IPost>("Post", PostSchema);

export { Post };
