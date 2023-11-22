import { forwardRef } from "react";
import { Button } from "@mui/material";
import './styles.scss'

type Props = {
    children: string | JSX.Element | JSX.Element[],
    className: string
} 

export const AppButton = forwardRef(({ children, className, ...props }:Props, ref) => {

  return <Button
            // ref={ref}
            className={`root ${className}`}
            variant="contained"
            color="primary"
            {...props}
        >
            {children}
        </Button>
})