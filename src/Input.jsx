import PropTypes from "prop-types";

export default function Input({
  label,
  placeholder,
  min,
  max,
  value,
  onChange,
}) {
  return (
    <fieldset className="fieldset">
      <label
        className={`label ${value.error ? "label-error" : ""}`}
        htmlFor={`input-${label}`}
      >
        {label}
      </label>
      <input
        className={`input ${value.error ? "input-error" : ""}`}
        id={`input-${label}`}
        type="number"
        inputMode="numeric"
        placeholder={placeholder}
        min={min}
        max={max}
        step="date"
        value={value.value}
        onChange={(e) =>
          onChange((prev) => ({
            ...prev,
            value: e.target.value.replace(/^0+/, "0"),
            error: "",
          }))
        }
      />
      {value.error ? <span className="error">{value.error}</span> : null}
    </fieldset>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.number,
  value: PropTypes.object,
  onChange: PropTypes.func,
};
