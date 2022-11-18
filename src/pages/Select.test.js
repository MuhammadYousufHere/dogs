import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import Select from "@material-ui/core/Select";
import { screen } from "@testing-library/react";

beforeEach(() => {
    jest.resetAllMocks();
});

afterEach(() => {
    cleanup();
});

it("calls onChange if change event fired", () => {
    const mockCallback = jest.fn();
    render(
        <div>
            <Select
                native={true}
                onChange={mockCallback}
                data-testid="my-wrapper"
                defaultValue="1"
            >
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </Select>
        </div>
    );
    const wrapperNode = screen.getByTestId("my-wrapper");
    console.log(wrapperNode);
    const selectNode = wrapperNode.childNodes[0].childNodes[0];
    fireEvent.change(selectNode, { target: { value: "3" } });
    expect(mockCallback.mock.calls).toHaveLength(1);
});
