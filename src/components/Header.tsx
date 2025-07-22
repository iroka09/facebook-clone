
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
    <button className="inline-grid place-items-center p-1 rounded-full bg-gray-200" {...props}>
      {children}
    </button>
  )
}


export default function Navs({ withNav = true }) {
  return (
    <div >
      <header className="px-3 py-2 mb-2 flex justify-between items-center">
        <h2 className="font-bold text-primary text-3xl">facebook</h2>
        <div className="space-x-3 text-3xl">
          <CircleButton><IoMdAdd /></CircleButton>
          <CircleButton><IoSearch /></CircleButton>
          <CircleButton><RxHamburgerMenu /></CircleButton>
        </div>
      </header>
      {withNav && (
        <nav>
          <ul className="flex px-3 pb-4 justify-between text-2xl items-center border-b">
            <li><GoHome /></li>
            <li><RiGroupLine /></li>
            <li><RiMessengerLine /></li>
            <li><MdOndemandVideo /></li>
            <li><GrNotification /></li>
            <li><CiShop className="stroke-[0.8px]" /></li>
          </ul>
        </nav>
      )}
    </div>
  )
}