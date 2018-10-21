import visitedPersons from "./visitedPersons";
import * as types from "../actions/types";

describe("visitedPersons reducer", () => {
  it("should handle initial state", () => {
    expect(visitedPersons(undefined, {})).toEqual([]);
  });

  it("should handle ADD_VISITED_PERSON and add ids on top", () => {
    expect(
      visitedPersons([], {
        type: types.ADD_VISITED_PERSON,
        id: "123"
      })
    ).toEqual(["123"]);

    expect(
      visitedPersons(["123"], {
        type: types.ADD_VISITED_PERSON,
        id: "456"
      })
    ).toEqual(["456", "123"]);

    expect(
      visitedPersons(["456", "123"], {
        type: types.ADD_VISITED_PERSON,
        id: "123"
      })
    ).toEqual(["123", "456"]);
  });

  it("should handle POPULATE_VISITED_PERSONS", () => {
    expect(
      visitedPersons([], {
        type: types.POPULATE_VISITED_PERSONS,
        ids: ["123", "456"]
      })
    ).toEqual(["123", "456"]);
  });
});
