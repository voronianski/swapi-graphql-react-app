import { ADD_VISITED_PERSON, POPULATE_VISITED_PERSONS } from "./types";

export const addVisitedPerson = personId => ({
  type: ADD_VISITED_PERSON,
  id: personId
});

export const populateVisitedPersons = personIds => ({
  type: POPULATE_VISITED_PERSONS,
  ids: personIds
});
