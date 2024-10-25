import { RouterProvider } from 'react-router-dom'
import router from './router/index.tsx'
import './global.css'
import { useAccount } from 'wagmi'

function App() {
    return (
        <div className="app">
            <RouterProvider router={router}/>
        </div>
    )
}
export default App;
