import React from "react";
import { mount, shallow } from "enzyme";
import sinon from "sinon";

import App from "./App";
import Todo from "./components/todo";
import TodosList from "./components/todosList";
import InputText from "./components/inputText";
import Footer from "./components/footer";

describe("App component Test", () => {
  const dataBase = [
    { text: "todo 1", done: false, id: "lsFsz8ZzqW00cu0wNHX187Ns5mwOuorv" },
    { text: "todo 2", done: false, id: "n6TYFVLSJPg6dWU6UCI9JTLStFfF5NzN" },
    { text: "todo 3", done: false, id: "7xt9TdyYbJMBCW9K7OQgQoOP7qpcTb6A" }
  ];
  const wrapper = mount(<App />);
  const instance = wrapper.instance();
  it("renders App without crashing", () => {
    shallow(<App />);
  });
  it("renders All components", () => {
    expect(wrapper.find("InputText")).toExist();
    expect(wrapper.find("TodosList")).toExist();
    expect(wrapper.find("Footer")).toExist();
  });
  it("renders loading section", () => {
    wrapper.setState({ loading: true });
    expect(wrapper.find(".todos-loadingbar")).toExist();
  });
  it("componentDidMount all data", async () => {
    await instance.componentDidMount();
    expect(wrapper.state("todos")).toStrictEqual(dataBase);
  });
  it("testing upDateList method", async () => {
    await instance.componentDidMount();
    instance.upDateList({ text: "todo 4", done: false, id: "##" });
    expect(wrapper.state("todos")[3]).toStrictEqual({
      text: "todo 4",
      done: false,
      id: "##"
    });
  });
  it("testing upDateTodo method", async () => {
    await instance.componentDidMount();
    instance.upDateTodo({
      text: "test",
      done: true,
      id: "lsFsz8ZzqW00cu0wNHX187Ns5mwOuorv"
    });
    expect(wrapper.state("todos")[0]).toStrictEqual({
      text: "test",
      done: true,
      id: "lsFsz8ZzqW00cu0wNHX187Ns5mwOuorv"
    });
  });
});

describe("Todo component Test", () => {
  const onClick = sinon.spy();
  const wrapper = shallow(
    <Todo value={{ done: false, text: "test" }} onClick={onClick} />
  );
  it("renders div", () => {
    expect(wrapper.find("div")).toExist();
  });
  it("have correct classes", () => {
    expect(wrapper.find("div")).toHaveClassName("todo");
    expect(wrapper.find("div")).not.toHaveClassName("done");
  });
  it("correct render of props", () => {
    expect(wrapper.find("div")).toHaveText("test");
  });
  it("simulates click", () => {
    wrapper.find("div").simulate("click");
    expect(onClick.calledOnce).toBe(true);
  });
});

describe("TodosList component Test", () => {
  const dataBase = [
    { text: "todo 1", done: false, id: "lsFsz8ZzqW00cu0wNHX187Ns5mwOuorv" },
    { text: "todo 2", done: true, id: "n6TYFVLSJPg6dWU6UCI9JTLStFfF5NzN" },
    { text: "todo 3", done: true, id: "7xt9TdyYbJMBCW9K7OQgQoOP7qpcTb6A" }
  ];
  const onClick = sinon.spy();
  const wrapper = mount(
    <TodosList todos={dataBase} filter={"All"} isLoading={onClick} />
  );
  it("renders todo's components", () => {
    expect(wrapper).toContainMatchingElements(3, "Todo");
  });
  const wrapper2 = shallow(<TodosList todos={null} filter={"All"} />);
  it("renders loanding component", () => {
    expect(wrapper2.find(".todos-loading")).toExist();
  });
  const wrapper3 = shallow(<TodosList todos={dataBase} filter={"Done"} />);
  it("rendering whit filter Done", () => {
    expect(wrapper3).toContainMatchingElements(2, "Todo");
  });
  it("simulates click on todo", () => {
    wrapper
      .find("Todo")
      .first()
      .simulate("click");
    expect(onClick.calledOnce).toBe(true);
  });
});

describe("inputText component Test", () => {
  const wrapper = shallow(<InputText />);
  it("renders input element and title", () => {
    expect(wrapper).toContainMatchingElements(1, "input");
    expect(wrapper).toContainMatchingElements(1, "h1");
    expect(wrapper.find("h1")).toHaveText("ToDo List");
  });
  it("testing input typing", () => {
    wrapper
      .find("input")
      .simulate("change", { target: { value: "Your new Value" } });
    expect(wrapper.state("input")).toBe("Your new Value");
  });
  // it("testing input Enter click",()=>{
  //   wrapper.find('input').simulate('keypress', {key: 'Enter'});
  //   expect(wrapper.state('input')).toBe('');
  // });
});

describe("Footer component Test", () => {
  const wrapper = mount(<Footer filter={val => val} />);
  it("renders all filter options", () => {
    expect(wrapper.find(".filter-container")).toContainMatchingElements(
      4,
      "div"
    );
    expect(wrapper.find(".filter-container").childAt(0)).toHaveText("All ");
    expect(wrapper.find(".filter-container").childAt(1)).toHaveText("Active ");
    expect(wrapper.find(".filter-container").childAt(2)).toHaveText("Done");
  });
});
  