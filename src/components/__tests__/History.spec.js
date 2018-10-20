import React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";

import { History } from "../History";

describe("History component", () => {
  it("should include Title", () => {
    const wrapper = shallow(<History />);

    expect(wrapper.find("Title").prop("text")).toEqual("History");
  });

  it("should include VisitedPersons", () => {
    const wrapper = mount(
      <MockedProvider mocks={[]} addTypename={false}>
        <History personIds={["123", "456"]} />
      </MockedProvider>
    );

    expect(wrapper.exists("VisitedPersons")).toEqual(true);
  });
});
