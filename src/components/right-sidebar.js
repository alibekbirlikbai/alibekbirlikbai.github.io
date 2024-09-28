function RightSidebar({ project, links }) {
    const project_title = links && links.length > 0 ? links.find(link => link.title === 'Github') : null;
    const project_title_id = project_title ? project_title.id : '';
  
    if (!project || !links || links.length === 0) {
      return null;
    }
  
    return (
      <aside className='sidebar-right'>
        <a href={`#${project_title_id}`} className='sidebar-right__title'>{project}</a>
        
        <ul className='sidebar-right__list'>
          {links.map(link => (
            <li className='sidebar-right__list-item' key={link.id}>
              <a href={`#${link.id}`} className='sidebar-right__link'>{link.title}</a>
            </li>
          ))}
        </ul>
      </aside>
    );
  }
  
  export default RightSidebar;