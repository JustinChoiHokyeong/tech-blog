import GNB from "@/containers/GNB";
import MainContainer from "@/containers/MainContainer";
import Sidebar from "@/containers/Sidebar";

export default function Home() {
  return (
    <div>
      <GNB />
      <Sidebar />
      <MainContainer />
    </div>
  );
}
