import { Poppins } from "next/font/google";
import "./globals.css";
import SchemeWrapper from "./SchemeWrapper";
import SessionWrapper from "./SessionWrappper";
import ReduxProvider from "./ReduxProvider";

const poppins = Poppins({ subsets: ["latin"], weight: ['300', '400', '600', '700', '800', '900'] });

export const metadata = 
{
  title: "FINTS - FinCrime Trusted Source | Expert Solutions for Financial Crime Prevention",
  description: "FinCrime Trusted Source",
};

export default async function RootLayout({ children }) 
{

  return (
    <html lang="en">
      <meta name="keywords" content="financial crime, FinCrime, financial crime prevention, fraud detection, anti-money laundering, financial security, compliance solutions, risk management"/>
      <meta property="og:title" content="Fints - FinCrime Trusted Source"/>  
      <meta property="og:description" content="Fints offers expert solutions for financial crime prevention. Explore our resources and insights to combat financial crime effectively."/>
      <meta property="og:image" content="fints"/>
      <meta property="og:url" content="https://www.fintsacademy.com"/>
      <SessionWrapper>
        <ReduxProvider>
          <SchemeWrapper>
            <body className={poppins.className}>
              <main>{children}</main>  
            </body>
          </SchemeWrapper>
        </ReduxProvider>
      </SessionWrapper>
    </html>
  );
}
