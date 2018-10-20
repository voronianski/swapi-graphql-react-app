import React from "react";
import { shallow } from "enzyme";

import Header from "../Header";

describe("Header component", () => {
  it("should include logo", () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.exists(".header-logo")).toEqual(true);
  });

  it("should include navigation bar", () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.exists(".header-nav")).toEqual(true);
  });

  it("should include 'Search' navigation link", () => {
    const wrapper = shallow(<Header />);
    const searchLink = wrapper.find("NavLink").at(0);

    expect(searchLink.prop("to")).toEqual("/");
    expect(searchLink.prop("children")).toEqual("Search");
  });

  it("should include 'History' navigation link", () => {
    const wrapper = shallow(<Header />);
    const historyLink = wrapper.find("NavLink").at(1);

    expect(historyLink.prop("to")).toEqual("/history");
    expect(historyLink.prop("children")).toEqual("History");
  });
});
