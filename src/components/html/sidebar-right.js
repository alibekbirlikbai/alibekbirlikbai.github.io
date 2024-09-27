function SidebarRight({ links }) {
    return (
        <aside className='sidebar-right'>
            <span className='sidebar-right__title'>...</span>

            <ul className='sidebar-right__list'>
                {/* 1. GitHub */}

                {links.map(link => (
                    <li className='sidebar-right__list-item' key={link.id}>
                        <a href={`#${link.id}`} className='sidebar-right__link'>{link.title}</a>
                    </li>
                ))}

            </ul>
        </aside>
    );
};

export default SidebarRight;
