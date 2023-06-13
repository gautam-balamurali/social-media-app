const Button = ({
  clickHandlerFunction,
  label,
  params,
  className,
  style,
  disabled,
  title,
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
    >
      {label}
    </button>
  );
};

export default Button;
