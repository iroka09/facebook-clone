
import Link from "next/link"
import { GoHome } from "react-icons/go";
import { RiGroupLine } from "react-icons/ri";
import { RiMessengerLine } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";
import { GrNotification } from "react-icons/gr";
import { CiShop } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";



function CircleButton({ className = "", children, ...props }) {
  return (
    <button className="inline-grid place-items-center p-1 rounded-full bg-slate-200 text-slate-700 dormant-btn" {...props}>
      {children}
    </button>
  )
}


export default function Navs({ withNav = true }) {
  return (
    <div >
      <header className="px-3 py-2 flex justify-between items-center">
        <Link
          className="font-bold text-primary text-3xl"
          href="/"
        >
          facebook
        </Link>
        <div className="space-x-3 text-3xl active:*:bg-slate-300">
          <CircleButton><IoMdAdd /></CircleButton>
          <CircleButton><IoSearch /></CircleButton>
          <CircleButton><RxHamburgerMenu /></CircleButton>
        </div>
      </header>
      {withNav && (
        <nav>
          <ul className="flex px-3 justify-between text-2xl items-center border-b active:*:bg-slate-100 *:p-4">
            {[GoHome, RiGroupLine, RiMessengerLine, MdOndemandVideo, GrNotification, CiShop].map((Icon, i) => (
              <li key={i} className="stroke-[0.8px] dormant-btn">{<Icon />}</li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}