import UserFiles from "../usuarios/userFiles.js"; // Modelo con mayúscula
import User from "../usuarios/user.js";
/*
##################################################################################################
#                       funcion para subir los archivos                                          #
##################################################################################################
*/
export const uploadUserFiles = async (req, res) => {
  //console.log("req.usuario:", req.usuario); // Para verificar que el token trae el ID
  //console.log("req.files:", req.files);     // Para verificar los archivos recibidos

  try {
    const userId = req.usuario.id;
    const archivos = {};

    if (req.files?.foto) archivos.foto = req.files.foto[0].path;
    if (req.files?.cv) archivos.cv = req.files.cv[0].path;
    if (req.files?.recibo) archivos.recibo = req.files.recibo[0].path;

    // Buscar si ya existe un registro para este usuario
    let filesRecord = await UserFiles.findOne({ user: userId });

    if (filesRecord) {
      // Si existe, actualizar los archivos
      Object.assign(filesRecord, archivos);
    } else {
      // Si no existe, crear uno nuevo
      filesRecord = new UserFiles({ user: userId, ...archivos });
    }

    const savedFiles = await filesRecord.save();
    res.status(201).json(savedFiles);
  } catch (error) {
    console.error("Error al subir archivos:", error);
    res.status(500).json({ message: "Error al subir archivos", error: error.message });
  }
};

/*
##################################################################################################
#                       funcion para consultar los archivos                                       #
##################################################################################################
*/
export const obtenerArchivosUsuario = async (req, res) => {
  try {
    const userId = req.usuario.id;
    let filesRecord = await UserFiles.findOne({ user: userId });

    if (!filesRecord) {
      return res.status(404).json({ message: "No hay archivos para este usuario" });
    }

    res.json({
      foto: filesRecord.foto ? `http://localhost:5000/${filesRecord.foto}` : null,
      cv: filesRecord.cv ? `http://localhost:5000/${filesRecord.cv}` : null,
      recibo: filesRecord.recibo ? `http://localhost:5000/${filesRecord.recibo}` : null,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener archivos", error: error.message });
  }
};

/*
##################################################################################################
#                 funcion para consultar todos los archivos y datos de los usuarios              #
##################################################################################################
*/
export const obtenerArchivos = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('username age role');

    if (!users || users.length === 0) {
      return res.status(500).json( { success: false, message: "No hay usuarios con rol 'user'" });
    }
    
    // Buscar archivos correspondientes a los usuarios encontrados
    const filesRecords = await UserFiles.find({
      user: { $in: users.map(user => user._id) }
    }).populate('user', 'fullname username age email');

    if (!filesRecords || filesRecords.length === 0) {
      return res.status(500).json( { success: false, message: "No hay archivos para usuarios con rol 'user'" });
    }

    // Combinar datos en un solo array
    const combinedArray = filesRecords.map(record => ({
      userId: record.user._id.toString(),
      fullname: record.user.fullname,
      username: record.user.username,
      age: record.user.age,
      email: record.user.email,
      foto: record.foto ? `http://localhost:5000/${record.foto}` : null,
      cv: record.cv ? `http://localhost:5000/${record.cv}` : null,
      recibo: record.recibo ? `http://localhost:5000/${record.recibo}` : null,
    }));

    
    return res.json({ success: true, data: combinedArray });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error al obtener archivos y datos de usuarios", error: error.message });
  }
};