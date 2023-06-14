const Button = ({
  clickHandlerFunction,
  label,
  params,
  className,
  style,
  disabled,
  title,
  type,
}) => {
  const handleClick = () => {
    if (typeof clickHandlerFunction === "function") {
      if (params) {
        clickHandlerFunction(params);
      } else {
        clickHandlerFunction();
      }
    }
  };

  return (
    <button
      className={className}
      style={style}
      onClick={handleClick}
      disabled={disabled}
      title={title}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
