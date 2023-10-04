export const convertSlug = (a) => {
  let slug = a;

  slug = slug.toLowerCase();
  slug = slug.replace(
    /á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi,
    "a"
  );
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(
    /ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi,
    "o"
  );
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");

  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );

  slug = slug.replace(/ /gi, "-");

  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");

  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");
  return slug;
};

export const convertObject = (obj) => {
  const result = {};

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const valuesArray = obj[key].split(",");
      result[key] = valuesArray;
    }
  }

  return result;
};

export const convertObjectArr = (obj) => {
  for (const key in obj) {
    if (obj[key].includes(",")) {
      obj[key] = obj[key]
        .split(",")
        .map((value) => value.trim());
    } else {
      obj[key] = [obj[key]];
    }
  }
};
