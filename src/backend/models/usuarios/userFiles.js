import mongoose from "mongoose";

const userFilesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foto: {
      type: String, // ruta del archivo (uploads/users/<id>/foto.jpg)
    },
    cv: {
      type: String, // ruta del archivo (uploads/users/<id>/cv.pdf)
    },
    recibo: {
      type: String, // ruta del archivo (uploads/users/<id>/recibo.png)
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserFiles", userFilesSchema);
1 