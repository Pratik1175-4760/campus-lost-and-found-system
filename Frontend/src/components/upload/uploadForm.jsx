import { useState } from "react";
import { itemAPI } from "../../utils/api.js";
import { compressImage } from "../../utils/imageCompression.js";

// ─────────────────────────────────────────────
// This component handles:
// 1. Selecting an image
// 2. Compressing it (browser-image-compression)
// 3. Showing a preview before upload
// 4. Collecting item details from user
// 5. Sending everything to backend
// ─────────────────────────────────────────────

function UploadForm() {
  // ─── STATE ──────────────────────────────────
  // useState creates a variable that React watches.
  // When it changes, the page re-renders automatically.

  const [imageFile, setImageFile] = useState(null);       // The actual image file
  const [imagePreview, setImagePreview] = useState(null); // URL to show preview
  const [loading, setLoading] = useState(false);          // Is upload in progress?
  const [success, setSuccess] = useState(false);          // Did upload succeed?
  const [error, setError] = useState(null);               // Any error message?

  // Form data - stores all the fields the user fills
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    locationFound: "",
    itemType: "",
    color: "",
    contactInfo: "",
    contactNumber: "",
    status: "with_finder",
  });

  // ─── HANDLE INPUT CHANGE ────────────────────
  // This function runs every time the user types in any input field.
  // e.target.name = the name of the input (e.g., "name", "description")
  // e.target.value = what the user typed
  // We use spread operator (...) to copy all existing values
  // and only update the one that changed.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,          // Copy all previous values
      [name]: value,    // Update only the changed field
    }));
  };

  // ─── HANDLE IMAGE SELECT ────────────────────
  // This runs when user picks an image from their device.
  // Steps:
  // 1. Get the selected file
  // 2. Compress it to reduce size
  // 3. Create a preview URL so we can show it
  const handleImageChange = async (e) => {
    const file = e.target.files[0]; // Get first selected file

    if (!file) return; // If no file selected, do nothing

    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file only!");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Compress the image before storing
      // This reduces file size (e.g., 3MB → 500KB)
      const compressed = await compressImage(file);

      setImageFile(compressed);                              // Store compressed file
      setImagePreview(URL.createObjectURL(compressed));     // Create preview URL
      setLoading(false);
    } catch{
      setError("Failed to process image. Try again.");
      setLoading(false);
    }
  };

  // ─── REMOVE IMAGE ───────────────────────────
  // Clears the selected image and preview
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // ─── HANDLE FORM SUBMIT ─────────────────────
  // This runs when user clicks "Submit" button.
  // Steps:
  // 1. Validate - make sure required fields are filled
  // 2. Create FormData (special object for sending files + text together)
  // 3. Send to backend API
  // 4. Show success or error
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page from refreshing on form submit

    // Validate
    if (!imageFile) {
      setError("Please upload an image!");
      return;
    }
    if (!formData.name || !formData.description || !formData.locationFound ||
        !formData.itemType || !formData.contactInfo || !formData.contactNumber) {
      setError("Please fill all required fields!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // FormData is a special object that can hold both
      // text fields AND files together in one request.
      // Normal JSON cannot send files, so we use FormData.
      const data = new FormData();

      // Append the image file
      data.append("image", imageFile);

      // Append all text fields
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("locationFound", formData.locationFound);
      data.append("itemType", formData.itemType);
      data.append("color", formData.color);
      data.append("contactInfo", formData.contactInfo);
      data.append("contactNumber", formData.contactNumber);
      data.append("status", formData.status);

      // Send to backend
      // itemAPI.create() sends POST request to /api/items
      await itemAPI.create(data);

      // Success!
      setSuccess(true);
      setLoading(false);

    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Try again.");
      setLoading(false);
    }
  };

  // ─── SUCCESS SCREEN ─────────────────────────
  // Show this when upload is successful
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Item Uploaded!
          </h2>
          <p className="text-gray-500 mb-6">
            The item has been added successfully. Someone might find their lost item soon!
          </p>
          <button
            onClick={() => {
              // Reset everything to allow another upload
              setSuccess(false);
              setImageFile(null);
              setImagePreview(null);
              setFormData({
                name: "",
                description: "",
                locationFound: "",
                itemType: "",
                color: "",
                contactInfo: "",
                contactNumber: "",
                status: "with_finder",
              });
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Upload Another Item
          </button>
        </div>
      </div>
    );
  }

  // ─── MAIN FORM ──────────────────────────────
  // This is the main upload form UI
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">📸 Report Found Item</h1>
          <p className="text-gray-500 mt-2">
            Help someone find their lost item by uploading a photo
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          {/* Error Message */}
          {/* Only shows when error is not null */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-6 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* ─── IMAGE UPLOAD SECTION ─── */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Photo <span className="text-red-500">*</span>
            </label>

            {/* If no image selected, show the upload box */}
            {!imagePreview ? (
              <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                <div className="text-4xl mb-3">📷</div>
                <p className="text-gray-600 font-medium">Click to upload image</p>
                <p className="text-gray-400 text-sm mt-1">JPG, PNG, WEBP (Max 5MB)</p>
                {/* 
                  This input is hidden visually.
                  The <label> wrapping it makes clicking anywhere 
                  on the box trigger the file picker.
                */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              // If image is selected, show the preview
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full rounded-xl object-cover max-h-64"
                />
                {/* Remove button - sits on top right of image */}
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition shadow"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* ─── ITEM NAME ─── */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Water Bottle"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* ─── ITEM TYPE ─── */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Item Type <span className="text-red-500">*</span>
            </label>
            {/* 
              This is a dropdown (select).
              User picks from predefined options.
              Later we'll auto-fill this using TensorFlow.js AI.
            */}
            <select
              name="itemType"
              value={formData.itemType}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            >
              <option value="">Select item type</option>
              <option value="bottle">Bottle</option>
              <option value="phone">Phone</option>
              <option value="laptop">Laptop</option>
              <option value="wallet">Wallet</option>
              <option value="keys">Keys</option>
              <option value="id_card">ID Card</option>
              <option value="glasses">Glasses</option>
              <option value="bag">Bag</option>
              <option value="charger">Charger</option>
              <option value="earbuds">Earbuds</option>
              <option value="jacket">Jacket</option>
              <option value="cap">Cap</option>
              <option value="umbrella">Umbrella</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* ─── COLOR ─── */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Color
            </label>
            <select
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            >
              <option value="">Select color</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="yellow">Yellow</option>
              <option value="orange">Orange</option>
              <option value="pink">Pink</option>
              <option value="brown">Brown</option>
              <option value="grey">Grey</option>
              <option value="purple">Purple</option>
              <option value="multiple">Multiple Colors</option>
            </select>
          </div>

          {/* ─── DESCRIPTION ─── */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            {/* 
              textarea = multi-line input
              rows="3" = shows 3 visible lines
            */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the item in detail..."
              rows="3"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
            />
          </div>

          {/* ─── LOCATION ─── */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Location Found <span className="text-red-500">*</span>
            </label>
            <select
              name="locationFound"
              value={formData.locationFound}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            >
              <option value="">Select location</option>
              <option value="library">Library</option>
              <option value="gym">Gym</option>
              <option value="canteen">Canteen</option>
              <option value="hostel">Hostel</option>
              <option value="classroom">Classroom</option>
              <option value="lab">Lab</option>
              <option value="auditorium">Auditorium</option>
              <option value="playground">Playground</option>
              <option value="parking">Parking Area</option>
              <option value="common_area">Common Area</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* ─── CONTACT SECTION ─── */}
          <div className="border-t border-gray-100 pt-5 mt-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              📞 Your Contact Info
            </h3>

            {/* Contact Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleInputChange}
                placeholder="e.g. John Doe"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>

            {/* Contact Number */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="e.g. 9876543210"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* ─── STATUS TOGGLE ─── */}
          {/* 
            This tells others whether the item is still with the finder
            or already submitted to the lost & found center.
            This is important so seekers know where to go.
          */}
          <div className="border-t border-gray-100 pt-5 mt-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              📍 Item Status
            </h3>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, status: "with_finder" }))}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold border transition ${
                  formData.status === "with_finder"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
              >
                🏠 With Me
              </button>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, status: "submitted" }))}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold border transition ${
                  formData.status === "submitted"
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
                }`}
              >
                📦 Submitted to Center
              </button>
            </div>
          </div>

          {/* ─── SUBMIT BUTTON ─── */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition"
          >
            {loading ? "Uploading..." : "📤 Upload Item"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;