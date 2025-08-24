
import Link from "next/link"
import { GoHome } from "react-icons/go";
import { RiGroupLine } from "react-icons/ri";
import { RiMessengerLine } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";
import { GrNotification } from "react-icons/gr";
import { CiShop } from "react-icons/ci";



export default function Navs() {
  return (
    <header >
      <nav>
        <ul className="flex px-3 justify-between text-2xl items-center border-b active:*:bg-slate-100 *:p-4">
          {([[GoHome, "/", true], [RiGroupLine, "/people", false], [RiMessengerLine, "#", false], [MdOndemandVideo, "#", false], [GrNotification, "#", false], [CiShop, "#", true]] as const).map(([Icon, href, isBolder], i) => (
            <li key={i} className={`${isBolder ? "*:stroke-[0.9px] " : ""} text-gray-600`}>
              <Link href={href}><Icon /></Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}