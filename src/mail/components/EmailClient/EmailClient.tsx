"use client";
import { useContext, useEffect } from "react";
import EmailList from "../EmailList";
import EmailView from "../EmailView";
import { ZustandEmail } from "@/mail/store/types";
import { EmailClientStoreContext } from "@/mail/providers/EmailClientStoreProvider";
import { DataPoint } from "heatmap-ts";

export function EmailClient({ emails = [] }: { emails: ZustandEmail[] }) {
    const store = useContext(EmailClientStoreContext);
    let dataPoints: DataPoint[] = [];

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
                <EmailList initialEmails={emails} />
                <EmailView />
            </div>
            {/* <RefreshButton /> */}
        </>
    );
}
