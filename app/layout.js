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
  icons: {
    icon: [
      //! Android Icons
      { rel: "icon", type: "image/png", sizes: "36x36", url: "/favicon/android-icon-36x36.png", },
      { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon/android-icon-48x48.png", },
      { rel: "icon", type: "image/png", sizes: "72x72", url: "/favicon/android-icon-72x72.png", },
      { rel: "icon", type: "image/png", sizes: "96x96", url: "/favicon/android-icon-96x96.png", },
      { rel: "icon", type: "image/png", sizes: "144x144", url: "/favicon/android-icon-144x144.png", },
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/favicon/android-icon-192x192.png", },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/favicon/android-icon-512x512.png", },

      //! Apple Icons
      { rel: "apple-touch-icon", type: "image/ico", url: "/favicon/apple-icon.png", },
      { rel: "apple-touch-icon", sizes: "57x57", url: "/favicon/apple-icon-57x57.png", },
      { rel: "apple-touch-icon", sizes: "60x60", url: "/favicon/apple-icon-60x60.png", },
      { rel: "apple-touch-icon", sizes: "72x72", url: "/favicon/apple-icon-72x72.png", },
      { rel: "apple-touch-icon", sizes: "76x76", url: "/favicon/apple-icon-76x76.png", },
      { rel: "apple-touch-icon", sizes: "114x114", url: "/favicon/apple-icon-114x114.png", },
      { rel: "apple-touch-icon", sizes: "120x120", url: "/favicon/apple-icon-120x120.png", },
      { rel: "apple-touch-icon", sizes: "144x144", url: "/favicon/apple-icon-144x144.png", },
      { rel: "apple-touch-icon", sizes: "152x152", url: "/favicon/apple-icon-152x152.png", },
      { rel: "apple-touch-icon", sizes: "180x180", url: "/favicon/apple-icon-180x180.png", },

      //! Favion Icons
      { rel: "icon", type: "image/ico", url: "/favicon/favicon.ico", },
      { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon/favicon-16x16.png", },
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon/favicon-32x32.png", },
      { rel: "icon", type: "image/png", sizes: "96x96", url: "/favicon/favicon-96x96.png", },
    ],

    //! Other Icons
    other: [{ rel: 'apple-touch-icon-precomposed', url: '/favicon/apple-icon-precomposed.png', },],
  },
  manifest: '/favicon/manifest.json',
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
