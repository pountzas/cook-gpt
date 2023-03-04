import { SunIcon } from "@heroicons/react/24/outline";
import CookGPTLogo from "../public/assets/svg/CookGPTLogo";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <CookGPTLogo size={250} />
      <h1 className="my-20 text-5xl font-bold">cookGPT</h1>

      <div>
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="w-8 h-8" />
            <h2>Examples</h2>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center ">
            <p className="exampleText">Lemon Pasta</p>
            <p className="exampleText">Mousaka</p>
            <p className="exampleText">Greek Lamb Kleftiko</p>
            <p className="exampleText">Moroccan Chicken</p>
            <p className="exampleText">Chicken Tikka Masala</p>
            <p className="exampleText">Chicken Korma</p>
            <p className="exampleText">Baked Cod with Lemon and Garlic</p>
            <p className="exampleText">Watermelon Salad</p>
            <p className="exampleText">Greek Salad</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
