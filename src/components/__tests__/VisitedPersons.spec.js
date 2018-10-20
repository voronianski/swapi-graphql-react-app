import React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "react-apollo/test-utils";

import VisitedPersons, { VisitedPersonsQuery } from "../VisitedPersons";

const personIds = ["123", "456"];
const setup = mock => {
  const mocks = mock ? [mock] : [];
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <VisitedPersons ids={personIds} />
      </MemoryRouter>
    </MockedProvider>
  );

  return wrapper;
};

describe("VisitedPersons component", () => {
  it("should render loading state", () => {
    const wrapper = setup();

    expect(wrapper.exists("Loading")).toEqual(true);
  });

  it("should render error state", async () => {
    const wrapper = setup({
      request: {
        query: VisitedPersonsQuery,
        variables: { personIds }
      },
      result: {
        errors: [{ message: "Error!" }]
      }
    });

    await wait(0);
    wrapper.update();

    expect(wrapper.exists("ErrorDetails")).toEqual(true);
  });

  it("should render empty state", async () => {
    const wrapper = setup({
      request: {
        query: VisitedPersonsQuery,
        variables: { personIds }
      },
      result: {
        data: {
          allPersons: []
        }
      }
    });

    await wait(0);
    wrapper.update();

    expect(wrapper.find(".visited-persons-empty").text()).toEqual(
      "You did not visit any person yet..."
    );
    expect(wrapper.find(".visited-persons-link").length).toEqual(0);
  });

  it("should render success state", async () => {
    const wrapper = setup({
      request: {
        query: VisitedPersonsQuery,
        variables: { personIds }
      },
      result: {
        data: {
          allPersons: [
            {
              id: "123",
              name: "Luke",
              gender: "MALE"
            },
            {
              id: "456",
              name: "Leia",
              gender: "FEMALE"
            }
          ]
        }
      }
    });

    await wait(0);
    wrapper.update();

    expect(wrapper.exists(".visited-persons")).toEqual(true);
    expect(wrapper.find(".visited-persons-link").length).toEqual(2);
  });
});
