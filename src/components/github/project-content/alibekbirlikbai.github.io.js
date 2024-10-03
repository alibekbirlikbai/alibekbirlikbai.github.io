import React, { useEffect, useRef, useState } from 'react';

import hljs from 'highlight.js';
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/atom-one-light.css';

import PullRequestList from '../fetch-pullrequests'
import CalculateLastUpdate from '../calculate-last-update'

// Register languages (code highlight)
hljs.registerLanguage('java', java);
hljs.registerLanguage('python', python);

const articles = [
    { title: 'Github', id: 'github' },
    // { title: 'Demo', id: 'demo' },
    { title: 'Описание', id: 'overview' },
    { title: 'Фичи', id: 'features' },
    { 
        title: 'Детали', 
        id: 'details',
        // subArticles: [
        //     { title: 'Sub Article 1', id: 'sub-article-1' },
        // ]
    },
];

function PersonalSiteProject({ currentProject, onUpdateArticles }) {
    const javaCodeRef = useRef(null);
    const pythonCodeRef = useRef(null);

    const [javaLanguage, setJavaLanguage] = useState('');
    const [pythonLanguage, setPythonLanguage] = useState('');

    useEffect(() => {
        if (javaCodeRef.current) {
            hljs.highlightElement(javaCodeRef.current); 
            setJavaLanguage(javaCodeRef.current?.dataset.language || 'java'); 
        }
        if (pythonCodeRef.current) {
            hljs.highlightElement(pythonCodeRef.current);
            setPythonLanguage(pythonCodeRef.current?.dataset.language || 'python');
        }

        // это для ссылок (html)
        const links = document.querySelectorAll('main.a');
            links.forEach(link => {
            link.setAttribute('target', '_blank');
            });
    }, []);

    useEffect(() => {
        if (onUpdateArticles) {
            onUpdateArticles(articles);
        }
    }, [onUpdateArticles]);

    const renderSubArticleContent = (subArticleId) => {
        switch (subArticleId) {
            // case '':
            //     return (
            //         <div className='content__sub-article-container'>

            //         </div>
            //     );
            default:
                return <p>Контент для sub-article не определен</p>;
        }
    };

    // Function to render different content for each article based on the id
    const renderArticleContent = (articleId) => {
        let articleContentNotFound = <p>Контент для article не определен</p>;

        const article = articles.find(article => article.id === articleId);
        if (!article) return articleContentNotFound

        const renderSubArticles = (subArticles) => {
            return (
                <div className='content__sub-articles'>
                    {
                        subArticles.map(subArticle => (
                            <div className='sub-article' id={subArticle.id} key={subArticle.id}>
                                <h3>{subArticle.title}</h3>
        
                                {renderSubArticleContent(subArticle.id)}
                            </div>
                        ))
                    }
                </div>
            );
        };
        

        switch (articleId) {
            // case 'github':
            //     return (
            //         <div className='content__details' id={articleId} key={articleId}>
            //             <div className='content__stack'>
            //                 <ul className='stack-list'>

            //                     {currentProject.topics.map(
            //                         skill => (
            //                             <li className='stack-list__item'>
            //                                 {skill
            //                                     .replace(/-/g, ' ')
            //                                     .replace(/\b\w+/g, word => word.toLowerCase() === 'api' ? 'API' : word.charAt(0).toUpperCase() + word.slice(1)) 
            //                                 }
            //                             </li>
            //                         )
            //                     )}

            //                 </ul>
            //             </div>

            //             <div className='content__version-control'>
            //                 <div className='version-control'>
            //                     <div className='version-control__block'>
            //                         <div className='version-control__block-title'>
            //                             github:&nbsp;
            //                         </div>

            //                         <div className='version-control__block-container'>
            //                             <a href={currentProject.html_url} target='_blank' rel='noopener noreferrer'>
            //                                 {currentProject.full_name}
            //                             </a>
            //                         </div>
            //                     </div>

            //                     <div className='version-control__block'>
            //                         <div className='version-control__block-title'>
            //                             pull-request:&nbsp;
            //                         </div>

            //                         <div className='version-control__block-container'>
            //                             <PullRequestList currentProject={currentProject} />
            //                         </div>
            //                     </div>

            //                     {/* <div className='version-control__block text-italic'>
            //                         <div className='version-control__block-title'>
            //                             обновлен&nbsp;
            //                         </div>

            //                         <div className='version-control__block-container'>
            //                             <CalculateLastUpdate currentProject={currentProject} />
            //                         </div>
            //                     </div> */}
            //                 </div>
            //             </div>
            //         </div>
            //     );
            case 'overview':
                return (
                    <div className='content__block-description'>
                        <div className='content__block-media'>
                            <div className='content__block-image'>
                                <figure>
                                    <img src='/img/personal-site.demo.png' alt='img' className='content__block-image' />
                                </figure>
                            </div>
                        </div>
                        
                        <p className='content__block-text'>
                            Hub для документирования и хостинга проектов
                        </p>
                    </div>
                );
            // // case 'demo':
            // //     return (
            // //         <div className='content__block-description'>
            // //             <div className='content__block-media'>
            // //                 <div className='content__block-image'>
            // //                     <figure>
            // //                         <img src='/img/test.png' alt='img' className='content__block-image' />
            // //                         <figcaption className='content__block-caption'>
            // //                             This is a img.
            // //                         </figcaption>
            // //                     </figure>
            // //                 </div>

            // //                 <div className='content__block-video'>
            // //                     <figure>
            // //                         <video controls className='content__block-video-element'>
            // //                             <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/webm" />
            // //                             Your browser does not support the video tag.
            // //                         </video>
            // //                         <figcaption className='content__block-caption'>
            // //                             This is a description of the video.
            // //                         </figcaption>
            // //                     </figure>
            // //                 </div>
            // //             </div>
            // //         </div>
            // //     );
            case 'features':
                return (
                    <div className='content__block-description'>
                        {/* <p className='content__block-text'>
                            Users should be able to:
                        </p> */}

                        <ul className='content__block-feature-list'>
                            <li className='content__block-feature-item'>Скрипт на JavaScript для динамического извлечения и отображения данных о репозиториях аккаунта (запрос через <a href='https://docs.github.com/en/rest?apiVersion=2022-11-28'>Github REST API</a>)</li>
                        </ul>
                    </div>
                );
            case 'details':
                return (
                    <div className='content__block-description'>
                        {article.subArticles && renderSubArticles(article.subArticles)}
                    </div>
                );
            default:
                return articleContentNotFound;
        }

        
    };

    return (
        <section className='content'>
            <div className='content__header'>
                <h1 className='content__title' id='project-title'>{currentProject.description}</h1>

                {renderArticleContent('github')}
            </div>

            <div className='content__body'>
                {articles
                    .filter(article => article.id != 'github')
                    .map((article, index) => (
                        <article className='content__block' id={article.id} key={article.id}>
                            <h2 className='content__block-title' id={article.id} >
                                {article.title}
                            </h2>
                            
                            {renderArticleContent(article.id)}
                        </article>
                ))}
            </div>
        </section>
    );
};

export default PersonalSiteProject;
