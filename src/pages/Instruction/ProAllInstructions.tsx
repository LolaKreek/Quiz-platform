import AppTopMenu from "../../components/AppTopMenu";
import { menuLinks } from "./constants";

const ProAllInstruction = () => {
    return(
        <AppTopMenu menuLinks={menuLinks} current="all" />
    )
}

export default ProAllInstruction;