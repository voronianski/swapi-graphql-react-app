import React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";

import PersonDetails, { PersonDetailsQuery } from "../PersonDetails";
import emojis from "../../utils/emojis";

const personId = "123";
const setup = mock => {
  const mocks = mock ? [mock] : [];
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PersonDetails id={personId} />
    </MockedProvider>
  );

  return wrapper;
};

describe("PersonDetails component", () => {
  it("should render loading state", () => {
    const wrapper = setup();

    expect(wrapper.exists("Loading")).toEqual(true);
  });

  it("should render error state", async () => {
    const wrapper = setup({
      request: {
        query: PersonDetailsQuery,
        variables: { personId }
      },
      result: {
        errors: [{ message: "Error!" }]
      }
    });

    await wait(0);
    wrapper.update();

    expect(wrapper.exists("ErrorDetails")).toEqual(true);
  });

  it("should render success state", async () => {
    const dataMock = {
      request: {
        query: PersonDetailsQuery,
        variables: { personId }
      },
      result: {
        data: {
          Person: {
            id: personId,
            name: "Luke",
            gender: "MALE",
            films: [
              {
                id: "456",
                title: "Test Episode",
                episodeId: 1,
                releaseDate: "1970-01-01"
              },
              {
                id: "789",
                title: "New Test Episode",
                episodeId: 2,
                releaseDate: "1980-01-01"
              }
            ]
          }
        }
      }
    };
    const wrapper = setup(dataMock);

    await wait(0);
    wrapper.update();

    const { Person } = dataMock.result.data;
    const titleText = `${emojis.getByGender(Person.gender)} ${Person.name}`;

    expect(wrapper.exists(".person-details")).toEqual(true);
    expect(wrapper.find("Title").prop("text")).toEqual(titleText);
    expect(wrapper.find(".person-details-film").length).toEqual(2);
    expect(wrapper.exists("RelatedPersons")).toEqual(true);
  });

  it("should not include RelatedPersons when person has < 2 films", async () => {
    const dataMock = {
      request: {
        query: PersonDetailsQuery,
        variables: { personId }
      },
      result: {
        data: {
          Person: {
            id: personId,
            name: "Luke",
            gender: "MALE",
            films: [
              {
                id: "456",
                title: "Test Episode",
                episodeId: 1,
                releaseDate: "1970-01-01"
              }
            ]
          }
        }
      }
    };
    const wrapper = setup(dataMock);

    await wait(0);
    wrapper.update();

    expect(wrapper.find(".person-details-film").length).toEqual(1);
    expect(wrapper.exists("RelatedPersons")).toEqual(false);
  });
});
