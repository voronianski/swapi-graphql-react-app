import React from "react";
import { shallow } from "enzyme";

import PersonLink from "../PersonLink";
import emojis from "../../utils/emojis";

const person = {
  id: "123",
  name: "Luke",
  gender: "MALE"
};

describe("PersonLink component", () => {
  it("should render proper link", () => {
    const wrapper = shallow(<PersonLink person={person} />);
    const link = wrapper.find("Link");

    expect(link.prop("to")).toEqual(`/person/${person.id}`);
    expect(link.prop("children")).toEqual(person.name);
  });

  it("should render proper gender emoji", () => {
    const wrapper = shallow(<PersonLink person={person} />);
    const emojiText = `${emojis.getByGender(person.gender)} `;

    expect(wrapper.find(".person-link-emoji").text()).toEqual(emojiText);
  });
});
