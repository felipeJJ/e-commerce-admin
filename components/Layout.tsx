import Nav from "@/components/Nav";

export default function Layout({children}: any) {
  return (
    <div className="bg-blue-500 min-h-screen flex ">
      <Nav />
      <div className="w-full bg-gray-100 justify-center items-center flex "> 
        <div id="principal" className="bg-white shadow-[0px_2px_8px_1px_rgba(200,200,200,0.3)] rounded-xl p-14 w-4/5 h-4/5  overflow-scroll">
          {children}
        </div>
      </div>
    </div>
  )
}
