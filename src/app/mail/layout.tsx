import { EmailClientStoreProvider } from "@/mail/providers/EmailClientStoreProvider";

export default async function Layout({ children } : {
    children: React.ReactNode;
}) {

  return (
    <>
        <EmailClientStoreProvider>
          {children}
        </EmailClientStoreProvider>
    </>
  )
}