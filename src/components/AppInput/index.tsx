import { ChangeEventHandler, KeyboardEvent, KeyboardEventHandler, forwardRef } from "react";
import { TextField, TextFieldVariants } from "@mui/material";

type Props = {
  className?: string;
  inputProps?: object;
  variant: TextFieldVariants | undefined;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onEnter?: Function;
  error: any;
  placeholder?: string;
  InputProps?: any;
  id?: string;
  type?: string;
};

export const AppInput = forwardRef(
  (
    {
      className,
      placeholder,
      value,
      type = "text",
      id,
      inputProps,
      onEnter,
      variant,
      error,
      onChange,
      ...props
    }: Props,
    ref
  ) => {
    return (
      <TextField
        id={id}
        inputRef={ref}
        variant={variant}
        className={className}
        value={value}
        onKeyDown={onEnter ? (e) => {
          if (e.key === 'Enter') {
            onEnter();
            e.preventDefault();
          }
        } : ()=>{}}
        placeholder={placeholder}
        inputProps={inputProps}
        onChange={onChange}
        error={error}
        type={type}
        {...props}
      />
    );
  }
);
