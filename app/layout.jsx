import "@styles/globals.css";

import Provider from "@components/Provider";
import Navbar from "@components/Navbar";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Navbar />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
