import React, { useState, useEffect } from 'react';

function RightSidebar({ project, links }) {
  const [activeArticle, setActiveArticle] = useState('');

  useEffect(() => {
    if (!links || links.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 10;

      const currentArticle = links.find(link => {
        const element = document.getElementById(`article-${link.id}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offsetTop = window.pageYOffset + rect.top;
          const offsetBottom = offsetTop + rect.height;
          return scrollPosition >= offsetTop && scrollPosition < offsetBottom;
        }
        return false;
      });

      if (currentArticle) {
        setActiveArticle(currentArticle.id);
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveArticle(hash.replace('article-', ''));
      } else if (!activeArticle) {
        setActiveArticle('project-title');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check
    handleScroll();
    handleHashChange();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [links]);

  if (!project || !links || links.length === 0) {
    return null;
  }

  const project_title = links.find(link => link.title === 'Github');
  const project_title_id = project_title ? project_title.id : '';

  return (
    <aside className='sidebar-right'>
      <a href={`#${project_title_id}`} className='sidebar-right__title'>{project}</a>
      
      <ul className='sidebar-right__list'>
        {links.map(link => (
          <li 
            className={`sidebar-right__list-item `}
            key={link.id}
          >
            <a href={`#article-${link.id}`} className={`sidebar-right__link ${activeArticle === link.id ? 'active' : ''}`}>{link.title}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default RightSidebar;