import { forwardRef } from "react";
import { TextField, TextFieldVariants } from "@mui/material";

type Props = {
    className?: string,
    inputProps?: object,
    variant: TextFieldVariants | undefined,
    id?: string,
    value: string
}

export const AppInput = forwardRef(({ className, value, id, inputProps, variant, ...props }:Props, ref) => {

  return <TextField
    id={id}
    inputRef={ref}
    variant={variant}
    className={className}
    value={value}
      inputProps={inputProps}
      {...props}
    />
})