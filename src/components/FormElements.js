export const CheckboxRadio = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
  value,
  name,
}) => {
  return (
    <>
      <div className="form-check">
        <input
          className={`form-check-input ${errors[name] && 'is-invalid'}`}
          type={type}
          name={name}
          id={id}
          value={value}
          {...register(name, rules)}
        />
        <label className="form-check-label" htmlFor={id}>
          {labelText}
        </label>
        {errors[name] && (
          <div className="invalid-feedback">{errors[name]?.message}</div>
        )}
      </div>
    </>
  );
};

export const Input = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
  placeholder,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        <span className="text-danger">* </span>
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`form-control rounded-0 ${errors[id] && 'is-invalid'}`}
        {...register(id, rules)}
      />
      {errors[id] && (
        <div className="invalid-feedback">{errors[id]?.message}</div>
      )}
    </>
  );
};

export const Select = ({
  id,
  labelText,
  register,
  errors,
  rules,
  children,
  disabled = false,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <select
        id={id}
        className={`form-select ${errors[id] && 'is-invalid'}`}
        {...register(id, rules)}
        disabled={disabled}
      >
        {children}
      </select>
      {errors[id] && (
        <div className="invalid-feedback">{errors[id]?.message}</div>
      )}
    </>
  );
};

export const Textarea = ({ id, labelText, register }) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <textarea
        name={id}
        id={id}
        className="form-control rounded-0"
        rows="3"
        {...register(id)}
      ></textarea>
    </>
  );
};
