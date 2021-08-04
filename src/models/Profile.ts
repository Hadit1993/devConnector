import { Schema, Model, model, PopulatedDoc, Document } from "mongoose";
import { User } from "./User";

interface Profile {
  user?: PopulatedDoc<User & Document>;
  handle: string;
  company?: string;
  website?: string;
  location?: string;
  status: string;
  skills: string[];
  bio?: string;
  githubUsername?: string;
  experience: ({
    title: string;
    company: string;
    location?: string;
    from: Date;
    to?: Date;
    current: boolean;
    description?: string;
  } & Document)[];

  education: ({
    school: string;
    degree: string;
    fieldOfStudy: string;
    from: Date;
    to?: Date;
    current: boolean;
    description?: string;
  } & Document)[];

  social: {
    youtube?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
  date: Date;
}

interface IProfile extends Model<Profile> {
  findProfile(query: {
    user?: any;
    handle?: string;
    id?: string;
  }): Promise<(Profile & Document<any, any, Profile>) | null>;
}

const ProfileSchema = new Schema<Profile, IProfile, Profile>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  handle: {
    type: String,
    required: true,
    min: 3,
    max: 40,
  },
  company: {
    type: String,
  },

  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },

  bio: {
    type: String,
  },

  githubUsername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },

      company: {
        type: String,
        required: true,
      },

      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },

      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],

  education: [
    {
      school: {
        type: String,
        required: true,
      },

      degree: {
        type: String,
        required: true,
      },

      fieldOfStudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },

      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],

  social: {
    youtube: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },

  date: {
    type: Date,
    default: new Date(),
  },
});

ProfileSchema.statics.findProfile = async function (query: any) {
  const profile = await this.findOne(query).populate("user", [
    "name",
    "avatar",
  ]);

  return profile;
};

const ProfileModel = model<Profile, IProfile>("Profile", ProfileSchema);

export { ProfileModel, Profile };
