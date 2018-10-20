import React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";

import { Person } from "../Person";

describe("Person component", () => {
  it("should call addVisitedPerson on render", () => {
    const props = {
      match: { params: { id: "123" } },
      addVisitedPerson: jest.fn()
    };

    shallow(<Person {...props} />);
    expect(props.addVisitedPerson.mock.calls.length).toBe(1);
    expect(props.addVisitedPerson.mock.calls[0][0]).toBe(props.match.params.id);
  });

  it("should include PersonDetails", () => {
    const props = {
      match: { params: { id: "123" } },
      addVisitedPerson: () => {}
    };

    const wrapper = mount(
      <MockedProvider mocks={[]} addTypename={false}>
        <Person {...props} />
      </MockedProvider>
    );

    expect(wrapper.exists("PersonDetails")).toEqual(true);
  });
});
