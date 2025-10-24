import "./styles/globals.scss";
import { ReactNode } from "react";
import { Poppins, Roboto } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});


export const metadata = {
  title: "Ticto",
  description: "Controle suas entradas e saidas "
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
<html lang="pt-BR" className={`${poppins.variable} ${roboto.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
