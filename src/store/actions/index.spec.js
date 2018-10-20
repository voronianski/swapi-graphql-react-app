import * as actions from "./index";
import * as types from "./types";

describe("visited persons actions", () => {
  it("addVisitedPerson should create ADD_VISITED_PERSON action", () => {
    const id = "12345";
    const expectedAction = {
      type: types.ADD_VISITED_PERSON,
      id
    };

    expect(actions.addVisitedPerson(id)).toEqual(expectedAction);
  });

  it("populateVisitedPersons should create POPULATE_VISITED_PERSONS action", () => {
    const ids = ["12345", "67890"];
    const expectedAction = {
      type: types.POPULATE_VISITED_PERSONS,
      ids
    };

    expect(actions.populateVisitedPersons(ids)).toEqual(expectedAction);
  });
});
