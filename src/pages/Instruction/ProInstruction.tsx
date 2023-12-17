import AppTopMenu from "../../components/AppTopMenu";
import { menuLinks } from "./constants";

const ProInstructionPage = () => {
    return(
        <AppTopMenu menuLinks={menuLinks} current="custom" />
    )
}

export default ProInstructionPage;