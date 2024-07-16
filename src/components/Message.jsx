import { useEffect, useState } from "react";
import { formDate } from "../helpers/formatDate";
import { supabase } from "../supabaseClient";

const Message = ({ message, date, email }) => {
    const [user, setUser] = useState("")

    const getSeccion = async () => {
        const { data } = await supabase.auth.getSession()
        setUser(data.session.user.email)
    }

    useEffect(() => {
        getSeccion()
    }, [])

    return (
        <div className={`card ${user === email ? "me":""}`}>
            <p> {message} </p>
            <span> {formDate(date)} </span>
            <span className="user-email"> {email.split('@')[0] } </span>
        </div>
    )
};

export default Message;
