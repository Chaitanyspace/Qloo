import * as React from "react";

export function RadioGroup({ value, onValueChange, children, className }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          checked: value === child.props.value,
          onChange: () => onValueChange(child.props.value),
        })
      )}
    </div>
  );
}

export function RadioGroupItem({ value, checked, onChange, children }) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio text-blue-600"
      />
      <span>{children}</span>
    </label>
  );
}
