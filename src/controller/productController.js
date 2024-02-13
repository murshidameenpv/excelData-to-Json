import productDb from "../model/productSchema.js";
import XLSX from "xlsx";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productDb.find().exec();
    console.log(products, "ppppppppppppp");
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
export const addProduct = async (req, res) => {
  const {
    category_name,
    product_name,
    product_barcode,
    product_sku,
    product_color,
    product_size,
    product_price,
  } = req.body;
  console.log(req.body, "pppppppppppppppppppppp");
  // console.log(req.body, "oooooooooooooooooooooo");
  try {
    const productExist = await productDb.findOne({ product_sku });
    if (productExist) {
      return res
        .status(400)
        .json({ message: "Product already exist in database" });
    }
    await productDb.create({
      category_name,
      product_name,
      product_barcode,
      product_sku,
      product_color,
      product_size,
      product_price,
    });
    res.status(200).json({ message: "Product Successfully Added" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  // console.log(productId, "oooooooopppoooooooooo");
  try {
    const deleteProduct = await productDb.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return res.status(404).json({ message: "item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  console.log(productId, "pppppppppppp");
  const {
    category_name,
    product_name,
    product_barcode,
    product_sku,
    product_color,
    product_size,
    product_price,
  } = req.body;
  // console.log(productId, "oooooooopppoooooooooo");
  try {
    const updateProduct = await productDb.findByIdAndUpdate(
      productId,
      {
        category_name,
        product_name,
        product_barcode,
        product_sku,
        product_color,
        product_size,
        product_price,
      },
      { new: true }
    );
    if (!updateProduct) {
      return res.status(404).json({ message: "item not found" });
    }
    res.status(200).json({ message: "Item Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const uploadExcel = async (req, res) => {
  try {
    let path = req.file.path;
    var workbook = XLSX.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    req.body.xlsxData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );
    if (req.body.xlsxData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "xlsx sheet has no data",
      });
    }

    const data = req.body.xlsxData;
    // console.log(data, "pppppppppppppppppppppppp");
    data.forEach(async (item) => {
      console.log(item,"ooooooooooooooo");
      await productDb.create(item)
    });
    res.status(200).json({ message: "added successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
