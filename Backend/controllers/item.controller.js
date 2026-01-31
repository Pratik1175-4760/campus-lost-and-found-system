import { asyncHandler } from "../utils/asyncHandler.js";
import { Item } from "../models/item.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create item
const createItem = asyncHandler(async (req, res) => {
  // Check if image exists
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image is required"
    });
  }

  // Upload to Cloudinary
  const cloudinaryResult = await uploadOnCloudinary(req.file.buffer);
  
  if (!cloudinaryResult) {
    return res.status(500).json({
      success: false,
      message: "Failed to upload image"
    });
  }

  // Create item in database
  const item = await Item.create({
    name: req.body.name,
    description: req.body.description,
    imageUrl: cloudinaryResult.secure_url,
    cloudinaryId: cloudinaryResult.public_id,
    locationFound: req.body.locationFound,
    itemType: req.body.itemType,
    color: req.body.color,
    contactInfo: req.body.contactInfo,
    contactNumber: req.body.contactNumber,
    status: req.body.status || 'with_finder',
    aiGenerated: req.body.aiGenerated || false,
    aiConfidence: req.body.aiConfidence
  });

  res.status(201).json({
    success: true,
    data: item
  });
});

// Get all items
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: items.length,
    data: items
  });
});

// Get single item
const getItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Item not found"
    });
  }

  res.status(200).json({
    success: true,
    data: item
  });
});

export { createItem, getItems, getItem };