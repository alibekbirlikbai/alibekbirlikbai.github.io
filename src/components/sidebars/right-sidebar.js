import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

function formatDescription(description) {
  if (!description.endsWith(')')) {
      return description;
  }
  
  let lastOpenParenIndex = -1;
  let count = 0;
  
  // Scan from right to left
  for (let i = description.length - 1; i >= 0; i--) {
      if (description[i] === ')') {
          count++;
      } else if (description[i] === '(') {
          count--;
          if (count === 0) {
              lastOpenParenIndex = i;
              break;
          }
      }
  }
  
  if (lastOpenParenIndex === -1) {
      return description;
  }
  
  return description.substring(lastOpenParenIndex + 1, description.length - 1);
}

function RightSidebar({ currentProject, allArticles = [] }) {
  const [activeArticle, setActiveArticle] = useState('github');
  const [activeSubArticle, setActiveSubArticle] = useState('');
  const [openSubList, setOpenSubList] = useState({});

  useEffect(() => {
    if (!allArticles || allArticles.length === 0) return;
  
    const initialState = {};
    allArticles.forEach(article => {
      initialState[article.id] = true;
    });
    setOpenSubList(initialState);
  
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveArticle(id);
      }
    };
  
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 10;
  
      let currentArticleFound = false;
  
      allArticles.forEach(article => {
        const element = document.getElementById(article.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offsetTop = window.pageYOffset + rect.top;
          const offsetBottom = offsetTop + rect.height;
  
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveArticle(article.id);
            currentArticleFound = true;
  
            const currentSubArticle = article.subArticles?.find(sub => {
              const subElement = document.getElementById(sub.id);
              if (subElement) {
                const subRect = subElement.getBoundingClientRect();
                const subOffsetTop = window.pageYOffset + subRect.top;
                const subOffsetBottom = subOffsetTop + subRect.height;
                return scrollPosition >= subOffsetTop && scrollPosition < subOffsetBottom;
              }
              return false;
            });
  
            if (currentSubArticle) {
              setActiveSubArticle(currentSubArticle.id);
            } else {
              setActiveSubArticle('');
            }
          }
        }
      });
  
      if (!currentArticleFound && scrollPosition <= 100) {
        setActiveArticle('github');
      }
    };

    const activateParentArticle = (subArticleId) => {
      allArticles.forEach(article => {
        if (article.subArticles) {
          const subArticle = article.subArticles.find(sub => sub.id === subArticleId);
          if (subArticle) {
            setActiveArticle(article.id); 
            setActiveSubArticle(subArticleId); 
          }
        }
      });
    };
  
    
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); 
      if (hash) {
        
        scrollToSection(hash);

        
        const isSubArticle = allArticles.some(article => article.subArticles?.some(sub => sub.id === hash));
        if (isSubArticle) {
          
          activateParentArticle(hash);
        } else {
          
          setActiveArticle(hash);
          setActiveSubArticle(''); 
        }
      }
    };
  
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
  
    
    handleHashChange(); 
  
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [allArticles]);
  

  const toggleSubList = (articleId) => {
    setOpenSubList(prevState => ({
      ...prevState,
      [articleId]: !prevState[articleId],
    }));
  };

  if (!currentProject || !allArticles || allArticles.length === 0) {
    return null;
  }

  return (
    <aside className='sidebar-right'>
      <p className='sidebar-right__title'>
        {formatDescription(currentProject.description)}
      </p>

      <ul className='sidebar-right__list'>
        {allArticles.map(article => (
          <li className='sidebar-right__list-item' key={article.id}>
            <div className='sidebar-right__sub-list-header'>
              {article.subArticles && article.subArticles.length > 0 && (
                <span 
                  className={`dropdown-icon ${openSubList[article.id] ? 'open' : ''}`}
                  onClick={() => toggleSubList(article.id)}
                >
                  <FontAwesomeIcon icon={faAngleUp} />
                </span>
              )}

              <a href={`#${article.id}`} className={`sidebar-right__link ${activeArticle === article.id ? 'active' : ''}`}>
                {article.title}
              </a>
            </div>            

            {/* Render sub-articles if any */}
            {article.subArticles && article.subArticles.length > 0 && (
              <ul className={`sidebar-right__sub-list ${openSubList[article.id] ? 'open' : 'closed'}`}>
                {article.subArticles.map(subArticle => (
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
