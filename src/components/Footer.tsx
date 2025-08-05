

export default function Footer() {
  return (
    <footer className="bg-slate-50 py-3">
      <div className="my-5 text-center text-lg text-slate-600">
        Developed By
        <a
          href="https://iroka09.vercel.app"
          className="font-[800] inline-block text-lg bg-gradient-to-r from-amber-500 to-rose-600 bg-clip-text text-transparent ml-2"
        >
          TOCHI
        </a>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 border-t-[0.5px] border-black/20 pt-3 text-slate-400 mt-5 text-sm">
        <span >
          All rights reserved. &copy; Copyright - 2023
        </span>
      </div>
    </footer>
  )
}