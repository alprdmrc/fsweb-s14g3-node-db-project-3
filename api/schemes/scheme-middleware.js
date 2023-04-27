const schemeModel = require("./scheme-model");
/*
  Eğer `scheme_id` veritabanında yoksa:

  durum 404
  {
    "message": "scheme_id <gerçek id> id li şema bulunamadı"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    let { scheme_id } = req.params;
    const scheme = await schemeModel.findById(scheme_id);
    if (scheme) {
      req.currentScheme = scheme;
      next();
    } else {
      res
        .status(404)
        .json({ message: `scheme_id ${scheme_id} id li şema bulunamadı` });
    }
  } catch (error) {
    next(error);
  }
};

/*
  Eğer `scheme_name` yoksa, boş string ya da string değil:

  durum 400
  {
    "message": "Geçersiz scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  try {
    let { scheme_name } = req.body;
    if (!scheme_name || scheme_name === "" || typeof scheme_name !== "string") {
      res.status(400).json({ message: "Geçersiz scheme_name" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

/*
  Eğer `instructions` yoksa, boş string yada string değilse, ya da
  eğer `step_number` sayı değilse ya da birden küçükse:

  durum 400
  {
    "message": "Hatalı step"
  }
*/
const validateStep = (req, res, next) => {
  try {
    let { instructions, step_number } = req.body;
    if (
      instructions === undefined ||
      instructions === "" ||
      typeof instructions !== "string" ||
      typeof step_number !== "number" ||
      step_number < 1
    ) {
      res.status(400).json({ message: "Hatalı step" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
