import { forwardRef } from "react";
import { Button } from "@mui/material";
import './styles.scss'

type Props = {
    children: string | JSX.Element | JSX.Element[],
    className: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
} 

export const AppButton = forwardRef(({ children, className, onClick, ...props }:Props, ref:any) => {

  return <Button
            ref={ref}
            className={`root ${className}`}
            variant="contained"
            color="primary"
            onClick={onClick}
            {...props}
        >
            {children}
        </Button>
})