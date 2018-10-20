const personIdsKey = "person-ids";

const getPersonIds = () => {
  let ids = [];

  try {
    const idsString = window.sessionStorage.getItem(personIdsKey);

    if (idsString) {
      ids = JSON.parse(idsString);
    }
  } catch (err) {
    console.error(`Failed to parse "${personIdsKey}" from sessionStorage`, err);
  }

  return ids;
};

const savePersonIds = (ids = []) => {
  sessionStorage.setItem(personIdsKey, JSON.stringify(ids));
};

export default {
  getPersonIds,
  savePersonIds
};
