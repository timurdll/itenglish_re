import "./globals.scss";
import AppRouter from "./components/Router/AppRouter";
import Header from "./components/Nav/Header";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <AppRouter />
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
