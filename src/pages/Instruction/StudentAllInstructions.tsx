import { useEffect, useState } from "react";
import AppTopMenu from "../../components/AppTopMenu";
import { studInstructionMenuLinks, useTableData } from "./constants";
import { Box } from "@mui/material";
import AppTable, { action } from "../../components/AppTable";
import EmptyTable from "../../components/EmptyTable";
import { getMaterialsAllData } from "../../services/uploadFile";
import { useSelector } from "react-redux";
import DownloadIcon from "@mui/icons-material/Download";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../services/Firebase/firebase";
import { useParams } from "react-router-dom";

const StudentAllInstruction = () => {
  const [data, setData] = useState([]);
  const { instructionAllHeaders } = useTableData();

  const params = useParams();

  //@ts-ignore
  const user = useSelector((state) => state.auth.user.id);

  const getMaterials = async () => {
    const response = await getMaterialsAllData({ id: "" });
    //@ts-ignore
    setData(response);
  };

  const handleDownload = (item: any) => {
    getDownloadURL(ref(storage, `instruction/${item}.pdf`)).then((url) => {
      // @ts-ignore
      window.open(url, "_blank").focus();
    });
  };

  useEffect(() => {
    getMaterials();
  }, []);

  const actions: action[] = [
    {
      title: "Pobierz",
      action: (item: any) => {handleDownload(item.id)},
      icon: <DownloadIcon />,
    },
  ];

  return (
    <>
      <AppTopMenu
        menuLinks={studInstructionMenuLinks}
        current="all"
        type="instruction"
      />

      {data ? (
        <Box>
          <AppTable
            overrideSearch={params.search}
            data={data}
            headers={instructionAllHeaders}
            actions={actions}
            type="all"
          />
        </Box>
      ) : (
        <EmptyTable />
      )}
    </>
  );
};

export default StudentAllInstruction;
