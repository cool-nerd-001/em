import RadioButtonGroup from '../app/components/RadioButtonGroup'
import {render } from "@testing-library/react";

describe("RadioButtonGroup", () => {
  const options = [
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
    { value: "c", label: "Option C" },
  ];

  it("renders all options correctly", () => {
    const { getByText } = render(     <RadioButtonGroup
        options={options}
        onChange={() => {}}
        selectedValue={"a"}
      />
    );

    options.forEach((option) => {
      const labelElement = getByText(option.label);
      expect(labelElement).toBeInTheDocument();
    });
  });

  
});
