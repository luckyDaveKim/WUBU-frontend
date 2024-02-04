import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    const testMenuItems = [
        {
            href: '/',
            title: 'Home',
        },
        {
            href: '/daily-price',
            title: 'Daily price',
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-200 text-black sticky top-0 h-14 flex justify-center items-center font-semibold uppercase">
                Cloudinary Actions
            </header>
            <div className="flex flex-col md:flex-row flex-1">
                <aside className="bg-gray-100 w-full md:w-60">
                    <nav>
                        <ul>
                            {testMenuItems.map(({ href, title }) => (
                                <li className="m-2" key={title}>
                                    <NavLink to={href}>
                                        <p className={'text-black'}>{title}</p>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <main className={'flex-1'}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
