import { forwardRef } from "react";
import { Button } from "@mui/material";

type Props = {
    children: string | JSX.Element | JSX.Element[],
    className: string,
    variant?: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
} 

export const AppButton = forwardRef(({ variant, children, className, onClick, ...props }:Props, ref:any) => {

  return <Button
            ref={ref}
            className={`app-button__root ${className}`}
            // @ts-ignore
            variant={variant || "contained"}
            onClick={onClick}
            {...props}
        >
            {children}
        </Button>
})