import { useEffect, useState } from "react";
import AppTopMenu from "../../components/AppTopMenu";
import { Box } from "@mui/material";
import AppTable, { action } from "../../components/AppTable";
import EmptyTable from "../../components/EmptyTable";
import { getMaterialsAllData } from "../../services/uploadFile";
import { useDispatch, useSelector } from "react-redux";
import DownloadIcon from '@mui/icons-material/Download';
import { useTableData } from "../Instruction/constants";
import { menuLinks, proUsersmenuLinks, studentsUsersmenuLinks } from "../Quiz/constants";
import { get, ref } from "firebase/database";
import { database } from "../../services/Firebase/firebase";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { addFavorite, removeFavorite } from "../../store/Slices/favorites";

const ProUsers = () => {
    
    
    const [data, setData] = useState([]);
    const { proUsersHeaders } = useTableData();

    //@ts-ignore
    const user = useSelector(state => state.auth.user.id)
    const favorites = useSelector((state: any) => state.favorites);

    const dispatch = useDispatch();

    const getUsers = async () => {
        get(ref(database, "student")).then((studs)=>{
            const students = studs.val()
            get(ref(database, `users`)).then((snapshot)=>{
                // [!!!] remove first filter after db will be updated with new data format
                let data = Object.values(snapshot.val()).filter((user: any) => !!user.email && user.role === "student").map((user: any) => {
                    if (students[user.id]) {
                        return {...user, phone: user.phone ? user.phone : "Unknown", ranking: students[user.id].reputation, passed: Object.values(students[user.id].history).length}
                    } else {
                        return {...user, phone: user.phone ? user.phone : "Unknown", ranking: 0, passed: 0}
                    }
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
      console.log(1)
    }, [favorites])

    const actions: action[] = [
        {
            title: "Favorite",
            action: (item: any) => {
                favorites.users.includes(item) ? dispatch(removeFavorite({value: item, type: "users"})) : dispatch(addFavorite({value: item, type: "users"}));
            },
            dynamicIcon: (item: any) => {
                return favorites.users.includes(item.id) ? <HeartBrokenIcon/> : <FavoriteIcon/> 
            }
        }
    ]

    return(
        <>
            <AppTopMenu menuLinks={proUsersmenuLinks} current="all" type="users" />

            {data ? 
                    <Box>
                        <AppTable
                            data={data} 
                            headers={proUsersHeaders} 
                            actions={actions}
                            type='all'
                        />
                    </Box>
                    : <EmptyTable />
            }
        </>
    )
}

export default ProUsers;