import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const vidoeSchema = new mongoose.Schema(
  {
    videoFile: {
      type: string, //cloudnary url
      required: true,
    },
    thumnail: {
      type: string, //cloudnary url
      required: true,
    },
    title: {
      type: string,
      required: true,
    },
    description: {
      type: string,
      required: true,
    },
    duration: {
      type: Number, //cloudnary url
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

vidoeSchema.plugin(mongooseAggregatePaginate)

export const Vidoe = mongoose.model("Video", vidoeSchema);
