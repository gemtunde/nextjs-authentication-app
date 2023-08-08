import * as React from "react";

interface ISlideButtonProps {
  type: "submit" | "reset" | "button";
  text: string;
  slide_text: string;
  icon: JSX.Element;
  disabled: boolean;
}

const SlideButton: React.FunctionComponent<ISlideButtonProps> = (props) => {
  const { type, text, slide_text, icon, disabled } = props;
  return (
    <button
      type={type}
      disabled={disabled}
      className="relative w-full inline-flex items-center px-8 py-3 mt-4 overflow-hidden font-medium bg-blue-600 transition duration-300 ease-out border-2 rounded-md group"
    >
      {disabled ? (
        "loading..."
      ) : (
        <>
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-800 group-hover:translate-x-0 ease-out">
            {icon}&nbsp; {slide_text}
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-white duration-300 transition-all bg-blue-600 group-hover:translate-x-full ease">
            {icon}&nbsp; {text}
          </span>
          <span className="relative invisible">{text}</span>
        </>
      )}
    </button>
  );
};

export default SlideButton;
