import { Link } from "react-router-dom";
import { SmallRightArrowIcon } from "./Icons"

type LinkType = {
    display : string;
    link : string;
}

const NavigateBar = ({links} : {links : LinkType[]}) => {
  return (
    <main className="w-full flex gap-1 sm:gap-2 py-1 sm:py-3 underline text-green-800 text-[13px] sm:text-sm md:text-base">
        {
            links.map((link) => {
                return (
                  <div key={link.link} className="flex gap-1 items-center">
                    <SmallRightArrowIcon />
                    <Link to={link.link}>{link.display}</Link>
                  </div>
                );
            })
        }
    </main>
  )
}

export default NavigateBar