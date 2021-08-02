import { Schema, Model, model } from "mongoose";

interface Profile {
  user?: string;
  handle: string;
  company?: string;
  website?: string;
  location?: string;
  status: string;
  skills: string[];
  bio?: string;
  githubUsername?: string;
  experience: {
    title: string;
    company: string;
    location?: string;
    from: Date;
    to?: Date;
    current: boolean;
    description?: string;
  }[];

  education: {
    school: string;
    degree: string;
    fieldOfStudy: string;
    from: Date;
    to?: Date;
    current: boolean;
    description?: string;
  }[];

  social: {
    youtube?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
  date: Date;
}

const ProfileSchema = new Schema<Profile, Model<Profile>, Profile>({
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

const ProfileModel = model<Profile>("Profile", ProfileSchema);

export { ProfileModel, Profile };
