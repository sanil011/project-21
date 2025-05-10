import { Stop } from "@mui/icons-material";
import { terms, termsImages } from "../../../data";
import { logo } from "../../../images";

const TermsBox = () => {
  return (
    <div className="bg-[#2b3270] mx-4 rounded-xl p-3 mb-3 text-white text-sm">
      <div className="w-full flex justify-around items-center">
        <img src={logo} className=" h-10" alt="Play-247" />
        <p className="border-2 border-red-500 text-red-500 text-lg font-semibold rounded-full p-2">
          +18
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3 mb-8">
        {termsImages.map(termImage => <img key={termImage.id} src={termImage.image} alt={termImage.image} />)}
      </div>
      <div className="my-3 flex flex-col gap-5" style={{ fontFamily: "Georgia, serif" }}>
        {terms.map((term) => (
          <div key={term.id} className="flex gap-1">
            <Stop color="primary" sx={{color: "#61a9ff",rotate: "45deg", marginTop: "5px", fontSize: "13px"}} />
            <p>{term.text}</p>
          </div>
        ))}
      </div>
      <p className="text-red-500">
        Gambling can be addictive, please play rationally. Play-247 only accepts
        customers above the age of 18.
      </p>
    </div>
  );
};

export default TermsBox;
