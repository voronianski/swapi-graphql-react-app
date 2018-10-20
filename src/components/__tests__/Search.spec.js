import React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "react-apollo/test-utils";

import Search, { SearchQuery } from "../Search";

const searchText = "Test name query";
const setup = mock => {
  const mocks = mock ? [mock] : [];
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    </MockedProvider>
  );

  wrapper.submitForm = async () => {
    wrapper.find(".search-form-field").simulate("change", {
      target: { name: "searchText", value: searchText }
    });
    await wait(0);

    wrapper.find(".search-form").simulate("submit", {
      preventDefault() {}
    });
  };

  return wrapper;
};

describe("Search component", () => {
  it("should include Title", () => {
    const wrapper = setup();

    expect(wrapper.find("Title").prop("text")).toEqual("Search");
  });

  it("should render form without search results", () => {
    const wrapper = setup();

    expect(wrapper.exists(".search-form")).toEqual(true);
    expect(wrapper.exists(".search-results")).toEqual(false);
    expect(wrapper.find(".search-results-link").length).toEqual(0);
  });

  it("should render loading state", async () => {
    const wrapper = setup();

    await wrapper.submitForm();

    expect(wrapper.find(".search-form-btn").text()).toEqual("Searching...");
  });

  it("should render error state", async () => {
    const wrapper = setup({
      request: {
        query: SearchQuery,
        variables: { searchText }
      },
      result: {
        errors: [{ message: "Error!" }]
      }
    });

    await wrapper.submitForm();
    await wait(500);
    wrapper.update();

    expect(wrapper.exists("ErrorDetails")).toEqual(true);
  });

  it("should render success state", async () => {
    const wrapper = setup({
      request: {
        query: SearchQuery,
        variables: { searchText }
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

    await wrapper.submitForm();
    await wait(500);
    wrapper.update();

    expect(wrapper.exists(".search-results")).toEqual(true);
    expect(wrapper.find(".search-results-link").length).toEqual(2);
  });
});
