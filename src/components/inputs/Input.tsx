import * as React from "react";
import { IoAlertCircle } from "react-icons/io5";
import { ImEyeBlocked, ImEye } from "react-icons/im";

interface InputProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  icon: JSX.Element;
  register: any;
  error: any;
  disabled: boolean;
}

const Input: React.FunctionComponent<InputProps> = (props) => {
  const { name, label, type, icon, placeholder, register, error, disabled } =
    props;
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="mt-3 w-[100%]">
      <label htmlFor={name} className="text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-event-none absolute left-0 inset-y-0 flex items-center pl-3">
          <span className="text-gray-500 text-sm">{icon}</span>
        </div>
        <input
          className="w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-indigo-500 text-sm focus:ring-2"
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          {...register(name)}
          style={{
            borderColor: `${error ? "#ED4337" : ""}`,
          }}
        />
        {/* show and hide password */}
        {(name === "password" || name === "confirmpassword") && (
          <div
            className="absolute right-8 top-2.5 text-xl text-gray-700 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ImEye /> : <ImEyeBlocked />}
          </div>
        )}

        {/* error message */}
        {error && (
          <div className="fill-red-500 absolute right-2 top-2.5 text-xl">
            <IoAlertCircle fill="#ED4337" />
          </div>
        )}
        {error && <p className="text-sm text-[#ED4337]">{error}</p>}
      </div>
    </div>
  );
};

export default Input;
