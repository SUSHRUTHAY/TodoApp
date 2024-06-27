import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'
import MyURLs from './Routes/Routes';
import Styles from './Layout.module.css';

export function MyRoutes(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    {/* <Route path='/' element={<App />} />
                    <Route path="condition" element={<Condition />} />
                    <Route path="form" element={<MyForm />} />
                    <Route path="style" element={<NewStyles />} />
                    <Route path="effect" element={<Effect />} /> */}
                    {MyURLs.map((view, index) => (
                        <Route key={view.path} path={view.path} element={<view.view />} />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default function Layout(props) {
    return (
        <>
            <nav className={Styles.header}>
                <span>
                    My TODO App
                </span>
                <ul className={Styles.headerLinks}>
                    {MyURLs.map((view, index) => (
                        <li key={view.path}>
                            <Link to={view.path}>
                                {view.title.toUpperCase()}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={Styles.primaryContainer}>
                <Outlet />
            </div>
        </>
    )
}