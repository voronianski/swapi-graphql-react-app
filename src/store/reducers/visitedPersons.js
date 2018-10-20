import { ADD_VISITED_PERSON, POPULATE_VISITED_PERSONS } from "../actions/types";

const visitedPersons = (state = [], action) => {
  switch (action.type) {
    case ADD_VISITED_PERSON:
      // remove duplicates and add them on top
      if (state.includes(action.id)) {
        state.splice(state.indexOf(action.id), 1);
      }

      return [action.id, ...state];
    case POPULATE_VISITED_PERSONS:
      return [...action.ids];
    default:
      return state;
  }
};

export default visitedPersons;
