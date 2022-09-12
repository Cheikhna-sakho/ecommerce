const FormInput = ({ label, errorMessage, id, ...inputProps }) => {
  const {value} = inputProps;

  return (
      <div>
        <label htmlFor={id} className={label.className}>
          {label.text}
        </label>
        <div className="mt-1">
          <input {...inputProps} />
      </div>
        {value.length === 0 && <small className="text-red-400">{errorMessage}</small>}
      </div>
  );
};

export default FormInput;
