import { Box, Typography } from "@mui/material";
import { get, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../services/Firebase/firebase";
import GradeIcon from "@mui/icons-material/Grade";
import { useTranslation } from "react-i18next";

const TopUsers = () => {
  const { t } = useTranslation("main");
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    get(query(ref(database, "student"))).then((snapshot) => {
      setData(
        Object.values(snapshot.val())
          .sort((a: any, b: any) => {
            return b.reputation - a.reputation;
          })
          .slice(0, 10)
      );
    });
  }, []);
  return (
    <Box className="top-users__root">
      <Typography variant="h5"> {t('topUsers')}</Typography>
      {data &&
        data.map((user: any, index: number) => (
          <Box className="top-users__item">
            <Box className="top-users__place">
              {index === 0 && (
                <GradeIcon
                  sx={{ width: "70px", height: "70px", zIndex: 1 }}
                  className="top-users__icon"
                />
              )}
              <Typography
                variant="h5"
                style={index === 0 ? { color: "white", zIndex: 2 } : {}}
              >
                {index + 1}
              </Typography>
            </Box>
            <Box className="top-users__info">
              <Typography>{user.info.name}</Typography>
              <Typography>{user.info.email}</Typography>
            </Box>
            <Box className="top-users__reputation">
              <Typography variant="h5">{user.reputation}</Typography>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default TopUsers;
