import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="flex h-screen text-white bg-zinc-800">
      <Sidebar />
      <Main />
    </div>
  );
};

export default Home;
