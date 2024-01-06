import { User } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../services/Firebase/firebase"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { Typography } from "@mui/material"
import { Navigate, redirect, useNavigate } from "react-router-dom"

const Protected = ({role, children}: {role: string | null, children: JSX.Element}) => {
    const [allowed, setAllowed] = useState<boolean | null>(null)
    const user = useSelector((state: RootState) => state.auth.user);
    

    const navigate = useNavigate()

    useEffect(() => {
      if (role) {
        if (user.id) {
            if (role === user.role) {
                setAllowed(true)
            } else {
                setAllowed(false)
                navigate("/")
            }
        } else {
            setAllowed(false)    
            navigate("/")
        }
      } else {
        setAllowed(true)
      }
      
    }, [])
    
  return allowed && allowed ? children : <></>
}

export default Protected