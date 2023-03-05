import Logo from "../Logo";
import Newsletter from "../Newsletter";
import Bid01Header from "./Bid01Header";
import CountDown from "./CountDown";
import Pieces from "./Pieces";

const Bid01 = () => {
  return (
    <div>
      <Newsletter />
      <Logo />
      <span className="font-quintessential mb-4">
        <Bid01Header />
      </span>
      <CountDown />
      <Pieces />
    </div>
  );
};

export default Bid01;
