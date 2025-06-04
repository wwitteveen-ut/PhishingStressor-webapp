"use client";
import { startTransition, useContext, useEffect } from "react";
import EmailList from "../EmailList";
import EmailView from "../EmailView";
import { ZustandEmail } from "@/mail/store/types";
import { EmailClientStoreContext, useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";
import { DataPoint } from "heatmap-ts";
import { getEmails } from "@/mail/actions/actions";

export function EmailClient({ emails = [] }: { emails: ZustandEmail[] }) {
    const store = useContext(EmailClientStoreContext);
    const setEmails = useEmailClientStore((state) => state.setEmails);

    let dataPoints: DataPoint[] = [];

        useEffect(() => {
        if (!store) return;

        setEmails(emails);

        const interval = setInterval(() => {
            startTransition(async () => {
                try {
                    const newEmails = await getEmails();
                    setEmails(newEmails);
                } catch (err) {
                    console.error("Error refetching emails:", err);
                }
            });
        }, 1000 * 30);

        return () => clearInterval(interval);
    }, [store]);

    useEffect(() => {
        if (!store) return;

        let mouseX = 0;
        let mouseY = 0;

        const unsub = store.subscribe(
            (state) => state.selectedEmailId,
            () => {
                console.log("Noticed email switch, stopped tracking. Received info:", dataPoints);
                dataPoints = [];
            }
        );

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const trackHeatmap = () => {
            dataPoints.push({ x: mouseX, y: mouseY, value: 100 });
        };

        const interval = setInterval(trackHeatmap, 500);

        return () => {
            unsub();
            clearInterval(interval);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [store]);

    return (
        <>
            <div className="flex flex-1 overflow-hidden">
                <EmailList />
                <EmailView />
            </div>
            {/* <RefreshButton /> */}
        </>
    );
}
