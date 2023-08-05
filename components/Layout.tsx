import Nav from "@/components/Nav";

export default function Layout({children}: any) {
  return (
    <div className="bg-blue-500 min-h-screen flex ">
      <Nav />
      <div className="w-full bg-gray-100 p-12 overflow-scroll "> 
          {children}
        </div>
      </div>
    
  )
}
