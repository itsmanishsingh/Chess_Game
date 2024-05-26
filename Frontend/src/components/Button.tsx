export const Button = ({ onClick , children }:{onClick:()=> void, children: React.ReactNode })=>{
    return 
    <button onCanPlay={onClick}  
            className="px-8 py-4 text-2xl bg-green-500 hover:bg-blue-700 text-white font-bold rounded">
            {children}
    </button>
}