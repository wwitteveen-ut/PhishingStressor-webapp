"use client";
import EmailList from "../EmailList";
import EmailView from "../EmailView";
import { ZustandEmail } from "@/mail/store/types";
import RefreshButton from "../RefreshButton";
import { EmailClientStoreContext } from "@/mail/providers/EmailClientStoreProvider";
import { useContext, useEffect } from "react";

export function EmailClient({emails = []}: {emails: ZustandEmail[]}) {
    const store = useContext(EmailClientStoreContext);
    
    useEffect(() => {

        if (!store) return;
        console.log("hello");

        const unsub = store.subscribe(
            (state) => state.selectedEmailId,
            console.log
        );
        return () => unsub();
    }, [store]);

    return (
            <>
            <div className="flex flex-1 overflow-hidden">
                <EmailList initialEmails={emails}/>
                <EmailView/>
            </div>
            <RefreshButton/>
            </>
    );
}