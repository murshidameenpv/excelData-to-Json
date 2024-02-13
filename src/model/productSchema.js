import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_barcode: {
      type: Number,
      required: true,
    },
    product_sku: {
      type: String,
      required: true,
    },
    product_color: {
      type: String,
      required: true,
    },
    product_size: {
      type: String,
      enum: ["S", "M", "XL", "L"],
      require: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const productDb = mongoose.model("Product", productSchema);
export default productDb;
