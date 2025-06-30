// models/Location.js
import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema({
  locationName: {
    type: String,
    required: true,
    trim: true,
  },
  locationCode: {
    type: String,
    required: true,
    trim: true,
  },
  locationParentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    default: null,
  },
  hasParent: {
    type: Boolean,
    default: false,
  },
  isFactory: {
    type: Boolean,
    default: false,
  },
  specialAssetCount: {
    type: Number,
    default: 0,
  },
  asset: [
    {
      asset_status: Number,
      count: Number,
    }
  ],
  assets: {
    type: Map,
    of: Number,
    default: {},
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    }
  ]
}, { timestamps: true });

export const Location = mongoose.model("Location", locationSchema);


/*
import mongoose, { Schema } from "mongoose";

const factorySchema = new Schema({
    location: {
        type: String,
        required: true,
        trim: true,
    },

    locationCode: {
        type: String,
        required: true,
        trim: true,
    },

    childLocations: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: "ChildLocation",
        }
    ],

    locationCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

}, {timestamps: true});

export const Factory = mongoose.model("Factory", factorySchema);


const parentLocationSchema = new Schema({



}, {timestamps: true});

export const ParentLocation = mongoose.model("ParentLocation", parentLocationSchema);


const childLocationSchema = new Schema({
    childLocationName: {
        type: String,
        required: true,
        trim: true,
    },

    parentLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChildLocation",
        default: null,
    },

    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChildLocation",
        }
    ],

}, {timestamps: true});

export const ChildLocation = mongoose.model("ChildLocation", childLocationSchema);
*/
