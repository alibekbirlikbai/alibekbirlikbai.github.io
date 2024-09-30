import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

function RightSidebar({ project, links = [] }) {
  const [activeArticle, setActiveArticle] = useState('github');
  const [activeSubArticle, setActiveSubArticle] = useState('');
  const [openSubList, setOpenSubList] = useState({});

  useEffect(() => {
    if (!links || links.length === 0) return;

    const initialState = {};
    links.forEach(link => {
      initialState[link.id] = true;
    });
    setOpenSubList(initialState);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 10;

      const currentArticle = links.find(link => {
        const element = document.getElementById(link.id);
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

        const currentSubArticle = currentArticle.subArticles?.find(sub => {
          const subElement = document.getElementById(sub.id);
          if (subElement) {
            const rect = subElement.getBoundingClientRect();
            const offsetTop = window.pageYOffset + rect.top;
            const offsetBottom = offsetTop + rect.height;
            return scrollPosition >= offsetTop && scrollPosition < offsetBottom;
          }
          return false;
        });

        if (currentSubArticle) {
          setActiveSubArticle(currentSubArticle.id);
        } else {
          setActiveSubArticle(''); 
        }
      } else {
        setActiveSubArticle(''); 
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveArticle(hash);
      } else if (!activeArticle) {
        setActiveArticle('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);

    handleScroll();
    handleHashChange();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [links, activeArticle]);

  const toggleSubList = (linkId) => {
    setOpenSubList(prevState => ({
      ...prevState,
      [linkId]: !prevState[linkId],
    }));
  };

  if (!project || !links || links.length === 0) {
    return null;
  }

  return (
    <aside className='sidebar-right'>
      <a href='#project-title' className='sidebar-right__title'>{project}</a>

      <ul className='sidebar-right__list'>
        {links.map(link => (
          <li className='sidebar-right__list-item' key={link.id}>
            <div className='sidebar-right__sub-list-header'>
              {link.subArticles && link.subArticles.length > 0 && (
                <span 
                  className={`dropdown-icon ${openSubList[link.id] ? 'open' : ''}`}
                  onClick={() => toggleSubList(link.id)}
                >
                  <FontAwesomeIcon icon={faAngleUp} />
                </span>
              )}

              <a href={`#${link.id}`} className={`sidebar-right__link ${activeArticle === link.id ? 'active' : ''}`}>
                {link.title}
              </a>
            </div>            

            {/* Render sub-articles if any */}
            {link.subArticles && link.subArticles.length > 0 && (
              <ul className={`sidebar-right__sub-list ${openSubList[link.id] ? 'open' : 'closed'}`}>
                {link.subArticles.map(subArticle => (
                  <li key={subArticle.id} className='sidebar-right__sub-list-item'>
                    <a
                      href={`#${subArticle.id}`}
                      className={`sidebar-right__link ${activeSubArticle === subArticle.id ? 'sub-article' : ''}`}
                    >
                      {subArticle.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default RightSidebar;
