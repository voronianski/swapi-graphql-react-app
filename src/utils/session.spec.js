import sessionUtil from "./session";

describe("session util", () => {
  it("should handle empty arrays", () => {
    sessionUtil.savePersonIds();

    expect(sessionUtil.getPersonIds()).toEqual([]);
  });

  it("should save person ids to sessionStorage", () => {
    const ids = ["123", "456"];

    sessionUtil.savePersonIds(ids);

    expect(sessionUtil.getPersonIds()).toEqual(ids);
  });
});
