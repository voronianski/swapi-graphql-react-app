import { ADD_VISITED_PERSON, POPULATE_VISITED_PERSONS } from "../actions/types";

const visitedPersons = (state = [], action) => {
  switch (action.type) {
    case ADD_VISITED_PERSON:
      return [action.id, ...state.filter(id => id !== action.id)];
    case POPULATE_VISITED_PERSONS:
      return [...action.ids];
    default:
      return state;
  }
};

export default visitedPersons;
