import relatedPersonsUtil from "./relatedPersons";

describe("relatedPersons util", () => {
  it("should handle empty data", () => {
    expect(relatedPersonsUtil()).toEqual([]);
  });

  it("should handle toPerson without films", () => {
    const toPerson = { id: "1" };
    const allPersons = [{ id: "2", films: [{ id: "10" }] }];

    expect(relatedPersonsUtil(toPerson, allPersons)).toEqual([]);
  });

  it("should handle allPersons without films", () => {
    const toPerson = { id: "1", films: [{ id: "10" }] };
    const allPersons = [{ id: "2" }];

    expect(relatedPersonsUtil(toPerson, allPersons)).toEqual([]);
  });

  it("should not return related without consecutive episodes in toPerson", () => {
    const toPerson = {
      id: "1",
      films: [{ id: "10", episodeId: 1 }, { id: "12", episodeId: 3 }]
    };
    const allPersons = [
      {
        id: "2",
        films: [{ id: "10", episodeId: 1 }, { id: "11", episodeId: 2 }]
      },
      {
        id: "3",
        films: [{ id: "11", episodeId: 2 }, { id: "12", episodeId: 3 }]
      }
    ];

    expect(relatedPersonsUtil(toPerson, allPersons)).toEqual([]);
  });

  it("should not return related without consecutive episodes in allPersons", () => {
    const toPerson = {
      id: "1",
      films: [{ id: "10", episodeId: 1 }, { id: "11", episodeId: 2 }]
    };
    const allPersons = [
      {
        id: "2",
        films: [{ id: "10", episodeId: 1 }, { id: "12", episodeId: 3 }]
      },
      {
        id: "3",
        films: [{ id: "11", episodeId: 2 }]
      }
    ];

    expect(relatedPersonsUtil(toPerson, allPersons)).toEqual([]);
  });

  it("should return related with only 2 consecutive episodes in toPerson", () => {
    const toPerson = {
      id: "1",
      films: [{ id: "10", episodeId: 1 }, { id: "11", episodeId: 2 }]
    };
    const allPersons = [
      {
        id: "2",
        films: [{ id: "10", episodeId: 1 }, { id: "11", episodeId: 2 }]
      },
      {
        id: "3",
        films: [{ id: "11", episodeId: 2 }, { id: "12", episodeId: 3 }]
      }
    ];

    expect(relatedPersonsUtil(toPerson, allPersons).length).toEqual(1);
  });

  it("should return related with all consecutive episodes in toPerson", () => {
    const toPerson = {
      id: "1",
      films: [
        { id: "10", episodeId: 1 },
        { id: "11", episodeId: 2 },
        { id: "12", episodeId: 3 }
      ]
    };
    const allPersons = [
      {
        id: "2",
        films: [{ id: "10", episodeId: 1 }, { id: "11", episodeId: 2 }]
      },
      {
        id: "3",
        films: [{ id: "11", episodeId: 2 }, { id: "12", episodeId: 3 }]
      }
    ];

    expect(relatedPersonsUtil(toPerson, allPersons).length).toEqual(2);
  });
});
