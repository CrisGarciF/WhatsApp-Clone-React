import { useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";
import { useState } from "react";
import Message from "./Message";
import Header from "./Header";
import SendMessages from "./SendMessages";

const Messages = () => {
    const [messages, setMessages] = useState([])
    const scroll = useRef()

    const callSupabase = async () => {
        const {data} = await supabase.from("messages").select("*")
        setMessages(data)
    }

    useEffect(() => {
        callSupabase()
    }, [])

    useEffect(() => {
        const chanel = supabase.channel("*").on("postgres_changes", {event: "INSERT", schema: "public", tabla: "messages"},
            (payload) => {
                const newMessage = payload.new;
                setMessages(messages => [...messages, newMessage])
            }
        )
        .subscribe();

        return () => {
            supabase.removeChannel(chanel)
        }
    }, [])

    return (
        <section className="messages">
            <Header />
            <div className="content">
                {
                    messages && messages.map((item, index) => (
                        <Message key={index} message={item.content} date={item.created_at} email={item.email} />
                    ))
                }
            </div>
            <SendMessages scroll={scroll} />
            <span ref={scroll}></span>
        </section>
    )
};

export default Messages;
