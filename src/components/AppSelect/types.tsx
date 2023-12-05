import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

export type appSelectType = {
    id: string,
    placeholder?: string,
    options: string[],
    className: string,
    variant: "outlined" | "standard" | "filled" | undefined,
    multiple?: boolean,
    value?: any,
    onChange?: (event: SelectChangeEvent<string[]>, child: ReactNode) => void,
    error?: any
}