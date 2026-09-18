import React from "react";

export interface InputProps {
  id: string;
  name: string;
  type?: "text" | "email" | "textarea" | "tel";
  placeholder?: string;
  label: string;
  required?: boolean;
}

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>((props, ref) => {
  const { id, name, placeholder, type, label, required, ...other } = props;

  return (
    <div>
      {label && (
        <label className="text-gray-500" htmlFor={name}>
          {label} {required && <span className="text-black/80">*</span>}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          className="!mt-2 bg-transparent resize-none outline-none w-full p-4 text-lg border border-gray-200 rounded-sm"
          id={id}
          placeholder={placeholder}
          name={name}
          required={required}
          rows={4}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...other}
        />
      ) : (
        <input
          className="!mt-2 bg-none bg-transparent outline-none h-14 w-full px-4 border border-gray-200 rounded-sm"
          type={type}
          id={id}
          placeholder={placeholder}
          name={name}
          ref={ref as React.Ref<HTMLInputElement>}
          required={required}
          {...other}
        />
      )}
    </div>
  );
});

// Set a display name for your component - react/display-name
Input.displayName = "Input";

export default Input;
