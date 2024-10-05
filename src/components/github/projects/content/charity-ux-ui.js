import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

import PullRequestList from '../../github-api-integration/fetch-pullrequests'
import CalculateLastUpdate from '../../github-api-integration/calculate-last-update'

import formatContentDescription from '../../../html/formatContentDescription'

const articles = [
    { title: 'Github', id: 'github' },
    // { title: 'Demo', id: 'demo' },
    { title: 'Описание', id: 'overview' },
    // { title: 'Фичи', id: 'features' },
    { 
        title: 'Детали', 
        id: 'details',
        subArticles: [
            { title: 'Sequence diagram', id: 'sequence-diagram' },
            { title: 'Home pages', id: 'home-pages' },
            { title: 'Site map', id: 'site-map' },
            { title: 'User interaction flow', id: 'user-interaction-flow' },
        ]
    },
];

function CharityUxUiProject({ currentProject, onUpdateArticles }) {
    const codeBlockRefs = useRef({}); 
    
    useEffect(() => {
        Object.values(codeBlockRefs.current).forEach((ref) => {
            if (ref) {
                const codeBlocks = ref.querySelectorAll('pre code');
                codeBlocks.forEach((block) => {
                    hljs.highlightElement(block); 
                    const language = block.dataset.language || 'plaintext'; 
                    const headerElement = block.closest('.content__block-code').querySelector('.content__code-language');
                    if (headerElement) {
                        headerElement.textContent = language; 
                        headerElement.setAttribute('data-language', language);
                    }
                });
            }
        });

        // это для ссылок (html)
        const links = document.querySelectorAll('a');

        links.forEach(link => {
            const isInsideExcludedTags = link.closest('aside') || link.closest('nav');

            if (!isInsideExcludedTags) {
                link.setAttribute('target', '_blank');
            }
        });
    }, []);

    useEffect(() => {
        if (onUpdateArticles) {
            onUpdateArticles(articles);
        }
    }, [onUpdateArticles]);

    const renderCodeBlock = (code, language, blockKey) => {
        return (
            <div className='content__block-code' ref={(el) => codeBlockRefs.current[blockKey] = el}>
                <div className='content__code-header'>
                    <span className='content__code-language'></span>
                </div>
                <pre>
                    <code data-language={language}>
                        {code}
                    </code>
                </pre>
            </div>
        );
    };

    const renderSubArticleContent = (subArticleId) => {
        switch (subArticleId) {
            case 'sequence-diagram':
                return (
                    <div className='content__sub-article-container'>
                        <div className='content__block-media'>
                            <div className='content__block-image'>
                                <figure>
                                    <img src='/img/charity-ux-ui.details.sequence-diagram.png' alt='img' className='content__block-image' />
                                    {/* <figcaption className='content__block-caption'>
                                        This is a img.
                                    </figcaption> */}
                                </figure>
                            </div>
                        </div>

                        <p className='content__block-text'>
                            Это диаграмма используется для визуализации взаимодействия между объектами в системе
                        </p>
                    </div>
                );
            case 'home-pages':
                return (
                    <div className='content__sub-article-container'>
                        <div className='content__block-media'>
                            <div className='content__block-image'>
                                <figure>
                                    <img src='/img/charity-ux-ui.details.main-page.png' alt='img' className='content__block-image' />
                                    {/* <figcaption className='content__block-caption'>
                                        This is a img.
                                    </figcaption> */}
                                </figure>
                            </div>
                        </div>

                        <p className='content__block-text'>
                            На этих диаграммах показаны основные компоненты <code>home-page</code> для пользователей с ролями <code>"Donor"</code> и <code>"Charity"</code>, такие как навигационное меню, content-layout и другие интерактивные функции, а также дается краткое объяснение их функциональности
                        </p>
                    </div>
                );
            case 'site-map':
                return (
                    <div className='content__sub-article-container'>
                        <div className='content__block-media'>
                            <div className='content__block-image'>
                                <figure>
                                    <img src='/img/charity-ux-ui.details.site-map.png' alt='img' className='content__block-image' />
                                    {/* <figcaption className='content__block-caption'>
                                        This is a img.
                                    </figcaption> */}
                                </figure>
                            </div>
                        </div>

                        <p className='content__block-text'>
                            На этой диаграмме показана взаимосвязь между главными страницами и то, как пользователи могут перемещаться по приложению. На ней представлен обзор ключевых функций предлагаемой системы
                        </p>
                    </div>
                );
            case 'user-interaction-flow':
                return (
                    <div className='content__sub-article-container'>
                        <div className='content__block-media'>
                            <div className='content__block-image'>
                                <figure>
                                    <img src='/img/charity-ux-ui.details.user-interaction-flow.png' alt='img' className='content__block-image' />
                                    {/* <figcaption className='content__block-caption'>
                                        This is a img.
                                    </figcaption> */}
                                </figure>
                            </div>
                        </div>

                        <p className='content__block-text'>
                            На этой диаграмме показано структурное представление внешнего вида страниц и расположения компонентов на нем, а также возможные сценарии взаимодействия пользователя с экранами приложений и реакции приложения на различные действия, выполняемые пользователем
                        </p>
                    </div>
                );
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
            case 'github':
                return (
                    <div className='content__details' id={articleId} key={articleId}>
                        <div className='content__stack'>
                            <ul className='stack-list'>

                                {currentProject.topics.map(
                                    skill => (
                                        <li className='stack-list__item'>
                                            {skill
                                                .replace(/-/g, ' ')
                                                .replace(/\b\w+/g, word => word.toLowerCase() === 'api' ? 'API' : word.charAt(0).toUpperCase() + word.slice(1)) 
                                            }
                                        </li>
                                    )
                                )}

                            </ul>
                        </div>

                        <div className='content__version-control'>
                            <div className='version-control'>
                                <div className='version-control__block'>
                                    <div className='version-control__block-title'>
                                        github:&nbsp;
                                    </div>

                                    <div className='version-control__block-container'>
                                        <a href={currentProject.html_url} target='_blank' rel='noopener noreferrer'>
                                            {currentProject.full_name}
                                        </a>
                                    </div>
                                </div>

                                {/* <div className='version-control__block'>
                                    <div className='version-control__block-title'>
                                        pull-request:&nbsp;
                                    </div>

                                    <div className='version-control__block-container'>
                                        <PullRequestList currentProject={currentProject} />
                                    </div>
                                </div> */}

                                {/* <div className='version-control__block text-italic'>
                                    <div className='version-control__block-title'>
                                        обновлен&nbsp;
                                    </div>

                                    <div className='version-control__block-container'>
                                        <CalculateLastUpdate currentProject={currentProject} />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                );
            case 'overview':
                return (
                    <div className='content__block-description'>
                        <p className='content__block-quote'>
                            <blockquote>
                                UI для остальных страниц находится в <a href='https://github.com/alibekbirlikbai/charity-ux-ui/blob/main/README.md'>Readme.md</a>
                            </blockquote>
                        </p>
                        
                        <div className='content__block-media'>
                            <div className='content__block-image'>
                                <figure>
                                    <img src='/img/charity-ux-ui.demo.png' alt='img' className='content__block-image' />
                                    {/* <figcaption className='content__block-caption'>
                                        This is a img.
                                    </figcaption> */}
                                </figure>
                            </div>
                        </div>
                        
                        <p className='content__block-text'>
                            UX/UI прототип сервиса с учетем <a href='https://aws.amazon.com/what-is/sdlc/'>SDLC</a> / <a href='https://habr.com/ru/articles/52681/'>SRS</a>
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
            // case 'features':
            //     return (
            //         <div className='content__block-description'>
            //             <p className='content__block-text'>
            //                 Users should be able to:
            //             </p>

            //             <ul className='content__block-feature-list'>
            //                 <li className='content__block-feature-item'>feature</li>
            //                 <li className='content__block-feature-item'>feature</li>
            //                 <li className='content__block-feature-item'>feature</li>
            //             </ul>
            //         </div>
            //     );
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
                <h1 className='content__title' id='project-title'>
                    {formatContentDescription(currentProject.description)}
                </h1>

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

export default CharityUxUiProject;
