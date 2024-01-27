import { useEffect, useState } from "react";
import AppTopMenu from "../../components/AppTopMenu";
import { Box } from "@mui/material";
import AppTable, { action } from "../../components/AppTable";
import EmptyTable from "../../components/EmptyTable";
import { getMaterialsAllData } from "../../services/uploadFile";
import { useDispatch, useSelector } from "react-redux";
import DownloadIcon from "@mui/icons-material/Download";
import { useTableData } from "../Instruction/constants";
import QuizIcon from "@mui/icons-material/Quiz";
import {
  menuLinks,
  proUsersmenuLinks,
  studentsUsersmenuLinks,
} from "../Quiz/constants";
import { get, ref } from "firebase/database";
import { database } from "../../services/Firebase/firebase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { addFavorite, removeFavorite } from "../../store/Slices/favorites";
import { useNavigate } from "react-router-dom";

const StudentFavoriteUsers = () => {
  const [data, setData] = useState([]);
  const { studUsersHeaders } = useTableData();

  //@ts-ignore
  const user = useSelector((state) => state.auth.user.id);
  const favorites = useSelector((state: any) => state.favorites);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getUsers = async () => {
    get(ref(database, "quiz")).then((quiz) => {
      const quizes = Object.values(quiz.val());
      get(ref(database, `users`)).then((snapshot) => {
        // [!!!] remove first filter after db will be updated with new data format
        let data = Object.values(snapshot.val())
          .filter(
            (user: any) =>
              !!user.email &&
              user.role === "professor" &&
              favorites.users.includes(user.id)
          )
          .map((user: any) => {
            return { ...user, phone: user.phone ? user.phone : "Unknown" };
          });
        let dataSnapshot = data.map((user: any) => {
          return {
            ...user,
            phone: user.phone ? user.phone : "",
            created: quizes.filter((quiz: any) => quiz.author === user.id)
              .length,
          };
        });
        // @ts-ignore
        setData(dataSnapshot);
      });
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [favorites]);

  const actions: action[] = [
    {
      title: "Quizes",
      action: (item: any) => {
        navigate(`/professors/quizes/${item}`);
      },
      icon: <QuizIcon />,
    },
    {
      title: "Favorite",
      action: (item: any) => {
        favorites.users.includes(item)
          ? dispatch(removeFavorite({ value: item, type: "users" }))
          : dispatch(addFavorite({ value: item, type: "users" }));
      },
      dynamicIcon: (item: any) => {
        return favorites.users.includes(item.id) ? (
          <HeartBrokenIcon />
        ) : (
          <FavoriteIcon />
        );
      },
    },
  ];

  return (
    <>
      <AppTopMenu
        menuLinks={studentsUsersmenuLinks}
        current="favorites"
        type="users"
      />

      {data ? (
        <Box>
          <AppTable
            data={data}
            headers={studUsersHeaders}
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

export default StudentFavoriteUsers;
