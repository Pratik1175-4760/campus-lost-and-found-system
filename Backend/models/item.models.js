import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    // Item details
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    description: { 
      type: String, 
      required: true,
      maxLength: 500
    },
    
    // Image
    imageUrl: { 
      type: String, 
      required: true 
    },
    cloudinaryId: {
      type: String  // Add this for image deletion later
    },
    
    // Location and type
    locationFound: { 
      type: String, 
      required: true 
    },
    itemType: { 
      type: String, 
      required: true,
      trim: true
    },
    color: { 
      type: String,
      trim: true
    },
    
    // Status
    status: { 
      type: String, 
      enum: ['with_finder', 'submitted', 'claimed', 'verified'],  // Fix: use underscore
      default: 'with_finder'  // Fix: match enum value
    },
    
    // Contact info (finder)
    contactInfo: { 
      type: String, 
      required: true 
    },
    contactNumber: { 
      type: String, 
      required: true 
    },
    
    // Claimed info (person who lost it)
    claimedBy: { 
      type: String,
      default: null
    },
    claimedInfo: {
      type: String,
      default: null
    },
    claimedNumber: {
      type: String,
      default: null
    },
    
    // AI fields (add these for your AI feature)
    aiGenerated: {
      type: Boolean,
      default: false
    },
    aiConfidence: {
      type: Number,
      min: 0,
      max: 1
    }
  },
  { timestamps: true }
);

// Index for faster searches
itemSchema.index({ itemType: 1, locationFound: 1, createdAt: -1 });

export const Item = mongoose.model("Item", itemSchema);