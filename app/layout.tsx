import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/utility/navbar";
import { AppContextProvider } from "@/context/appContext";
import { Footer3 } from "@/components/myComponents/subs/footer3";
// import {Roboto} from "next/font/google"
import SocketProvider from '../socket/socketPrivider.tsx';

// const roboto = Roboto({
//   subsets : ["latin"], style : "normal"
// });

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "EngineConnect",
  description: "Better by far",
};





export const SEO_CONFIG = {
  description:
    "Centre for learning",
  fullName: "EngineConnect",
  name: "EngineConnect",
  slogan: "Better by far",
};

export const SYSTEM_CONFIG = {
  redirectAfterSignIn: "/dashboard/uploads",
  redirectAfterSignUp: "/dashboard/uploads",
  // repoName: "relivator",
  // repoOwner: "blefnk",
  // repoStars: true,
};

// export const ADMIN_CONFIG = {
//   displayEmails: false,
// };

// export const DB_DEV_LOGGER = false;





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppContextProvider>
        <body
          className={`font-roboto_mono antialiased`}
          // ${geistSans.variable} ${geistMono.variable}
        > 
          <SocketProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                <Navbar />
                {children}
                <Footer3 className="mt-2" />
              </ThemeProvider>
          </SocketProvider>
        </body>
      </AppContextProvider>
    </html>
  );
}