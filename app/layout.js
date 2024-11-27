import { Poppins } from "next/font/google";
import "./globals.css";
import SchemeWrapper from "./SchemeWrapper";
import SessionWrapper from "./SessionWrappper";
import ReduxProvider from "./ReduxProvider";
import { Toaster } from "sonner";

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
      <meta property="og:image" content="https://res.cloudinary.com/dzuaagm1a/image/upload/v1732331974/imageedit_4_7861718629_qz3ghw.png"/>
      <meta property="og:url" content="https://www.fintsacademy.com"/>
      <SessionWrapper>
        <ReduxProvider>
          <SchemeWrapper>
            <body className={poppins.className}>
              {children}
              <Toaster toastOptions={{style:{backgroundColor: 'rgb(15, 18, 18)', color: 'white', padding: '20px', fontSize: '16px', border: 0, boxShadow: 'var(--box-shadow)'}}}/>
            </body>
          </SchemeWrapper>
        </ReduxProvider>
      </SessionWrapper>
    </html>
  );
}
