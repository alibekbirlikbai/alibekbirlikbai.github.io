function RightSidebar({ project, links }) {
    return (
        <aside className='sidebar-right'>
            <a href='/#project-title' className='sidebar-right__title'>{project}</a>

            <ul className='sidebar-right__list'>
                {links.map(link => (
                    <li className='sidebar-right__list-item' key={link.id}>
                        <a href={`#${link.id}`} className='sidebar-right__link'>{link.title}</a>
                    </li>
                ))}

            </ul>
        </aside>
    );
};

export default RightSidebar;
