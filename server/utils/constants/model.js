const article = {
  TITLE_MIN_LEN: 5,
  TITLE_MAX_LEN: 100,
  CONTENT_MIN_LEN: 100,
  CONTENT_MAX_LEN: 3000,
};

const baby = {
  NAME_MIN_LEN: 1,
  NAME_MAX_LEN: 100,
  HEIGHT_MIN: 0,
  WEIGHT_MIN: 0,
};

const category = {
  NAME_MIN_LEN: 3,
  NAME_MAX_LEN: 30,
};

const comment = {
  CONTENT_MIN_LEN: 10,
  CONTENT_MAX_LEN: 1000,
};

const diary = {
  TITLE_MIN_LEN: 5,
  TITLE_MAX_LEN: 100,
  DESC_MIN_LEN: 10,
  DESC_MAX_LEN: 1000,
};

const moment = {
  TITLE_MIN_LEN: 3,
  TITLE_MAX_LEN: 100,
  CONTENT_MIN_LEN: 10,
  CONTENT_MAX_LEN: 1000,
};

const user = {
  NAME_MIN_LEN: 1,
  NAME_MAX_LEN: 50,
  PASSWORD_MIN_LEN: 6,
  PASSWORD_MAX_LEN: 50,
};

module.exports = {
  article,
  baby,
  category,
  comment,
  diary,
  moment,
  user,
};
