import React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "react-apollo/test-utils";

import RelatedPersons, { RelatedPersonsQuery } from "../RelatedPersons";

const toPerson = {
  id: "1",
  name: "Luke",
  gender: "MALE",
  films: [
    {
      id: "10",
      title: "Test Episode",
      episodeId: 1,
      releaseDate: "1970-01-01"
    },
    {
      id: "11",
      title: "New Test Episode",
      episodeId: 2,
      releaseDate: "1980-01-01"
    }
  ]
};
const setup = mock => {
  const mocks = mock ? [mock] : [];
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <RelatedPersons toPerson={toPerson} />
      </MemoryRouter>
    </MockedProvider>
  );

  return wrapper;
};

describe("RelatedPersons component", () => {
  it("should not render loading state", () => {
    const wrapper = setup();

    expect(wrapper.exists("Loading")).toEqual(false);
  });

  it("should not render error state", async () => {
    const wrapper = setup({
      request: {
        query: RelatedPersonsQuery,
        variables: { personId: toPerson.id }
      },
      result: {
        errors: [{ message: "Error!" }]
      }
    });

    await wait(0);
    wrapper.update();

    expect(wrapper.exists("ErrorDetails")).toEqual(false);
  });

  it("should render only success state", async () => {
    const wrapper = setup({
      request: {
        query: RelatedPersonsQuery,
        variables: { personId: toPerson.id }
      },
      result: {
        data: {
          allPersons: [
            {
              id: "2",
              name: "Yoda",
              gender: "MALE",
              films: [
                {
                  id: "10",
                  episodeId: 1
                },
                {
                  id: "11",
                  episodeId: 2
                }
              ]
            },
            {
              id: "3",
              name: "Leia",
              gender: "FEMALE",
              films: [
                {
                  id: "11",
                  episodeId: 2
                }
              ]
            }
          ]
        }
      }
    });

    await wait(0);
    wrapper.update();

    expect(wrapper.exists(".related-persons")).toEqual(true);
    expect(wrapper.find(".related-persons-link").length).toEqual(1);
  });
});
