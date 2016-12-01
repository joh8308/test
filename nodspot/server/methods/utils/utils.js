export const customCheck = (o) => {
  let result = true;

  _.each(o, function (one) {
    if (!Match.test(one.v, one.c)) {
      result = false;
    }
  });

  return result;
};

export const nonEmptyString = Match.Where((x) => {
  if (!Match.test(x, String)) {
    return false;
  }

  return !(_.isEmpty(x));
});
