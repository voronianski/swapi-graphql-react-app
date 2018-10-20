function getByGender(gender) {
  if (gender === "MALE") {
    return "💁‍♂️";
  }

  if (gender === "FEMALE") {
    return "💁‍♀️";
  }
}

export default {
  getByGender
};
