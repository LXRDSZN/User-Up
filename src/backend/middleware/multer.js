import multer from "multer";
import fs from "fs";
import path from "path";

export const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const userId = req.usuario.id; // tu middleware JWT debe poner el id aquí
      const dir = `uploads/users/${userId}`;
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}${path.extname(file.originalname)}`);
    },
  }),
});
