import { useEffect, useState } from "react";
import AppTopMenu from "../../components/AppTopMenu";
import { Box } from "@mui/material";
import AppTable, { action } from "../../components/AppTable";
import EmptyTable from "../../components/EmptyTable";
import { useDispatch, useSelector } from "react-redux";
import { useTableData } from "../Instruction/constants";
import { studentsUsersmenuLinks } from "../Quiz/constants";
import { get, ref } from "firebase/database";
import { database } from "../../services/Firebase/firebase";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { addFavorite, removeFavorite } from "../../store/Slices/favorites";

const StudentUsers = () => {
    const [data, setData] = useState([]);
    const { studUsersHeaders } = useTableData();

    //@ts-ignore
    const user = useSelector(state => state.auth.user.id)
    const favorites = useSelector((state: any) => state.favorites);

    const dispatch = useDispatch();

    const getUsers = async () => {
        get(ref(database, "quiz")).then((quiz)=>{
            const quizes = Object.values(quiz.val())
            get(ref(database, `users`)).then((snapshot)=>{
                // [!!!] remove first filter after db will be updated with new data format
                let data = Object.values(snapshot.val()).filter((user: any) => !!user.email && user.role === "professor").map((user: any) => {
                    return {...user, phone: user.phone ? user.phone : "Unknown", created: quizes.filter((quiz: any) => quiz.author === user.id).length}
                })
                // @ts-ignore
                setData(data)
            })
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        getUsers()
      }, [favorites])

    const actions: action[] = [
        {
            title: "Ulubione",
            action: (item: any) => {
                favorites.users.includes(item.id) ? dispatch(removeFavorite({value: item.id, type: "users"})) : dispatch(addFavorite({value: item.id, type: "users"}));
            },
            dynamicIcon: (item: any) => {
                return favorites.users.includes(item.id) ? <HeartBrokenIcon/> : <FavoriteIcon/> 
            }
        }
    ]

    return(
        <>
            <AppTopMenu menuLinks={studentsUsersmenuLinks} current="all" type="users" />

            {data ? 
                    <Box>
                        <AppTable
                            data={data} 
                            headers={studUsersHeaders} 
                            actions={actions}
                            type='all'
                        />
                    </Box>
                    : <EmptyTable />
            }
        </>
    )
}

export default StudentUsers;