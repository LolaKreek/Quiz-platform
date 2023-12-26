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
            console.log(role === user.role)
            if (role === user.role) {
                setAllowed(true)
                console.log(allowed)
            } else {
                setAllowed(false)
                navigate("/")
                console.log(allowed)
            }
        } else {
            setAllowed(false)    
            navigate("/")
            console.log(allowed)
        }
      } else {
        setAllowed(true)
        console.log(allowed)
      }
      
    }, [])
    
  return allowed && allowed ? children : <></>
}

export default Protected