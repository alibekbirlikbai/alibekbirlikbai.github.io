import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import PullRequestList from '../../github-api-integration/fetch-pullrequests'
import CalculateLastUpdate from '../../github-api-integration/calculate-last-update'
import PrioritizeSpecificStack from '../../../html/prioritizeSpecificStack'

import imgDemo from '../../../../assets/img/news-api.demo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import formatContentDescription from '../../../html/formatContentDescription'

const articles = [
    { title: 'version control', id: 'version-control' },
    // { title: 'demo', id: 'demo' },
    { title: 'overview / demo', id: 'overview' },
    { title: 'core features', id: 'features' },
    // { 
    //     title: 'Детали', 
    //     id: 'details',
    //     // subArticles: [
    //     //     { title: 'GraphQL запрос', id: 'query-graphql' },
    //     //     { title: 'merge_branch.yaml (workflow)', id: 'workflow-merge-branch' },
    //     //     { title: 'readme_update.yaml (workflow)', id: 'workflow-readme-update' },
    //     // ]
    // },
];

function AndroidNewsApiProject({ currentProject, onUpdateArticles }) {
    const codeBlockRefs = useRef({});
    const contentRefs = useRef({});
    const [expanded, setExpanded] = useState(() => {
        const initialState = {};
        articles.forEach(article => {
            initialState[article.id] = false;
            if (article.subArticles) {
                article.subArticles.forEach(subArticle => {
                    initialState[subArticle.id] = false;
                });
            }
        });
        return initialState;
    });

    const updateParentHeight = (parentId) => {
        const parentElement = contentRefs.current[parentId];
        if (parentElement && expanded[parentId]) {
            requestAnimationFrame(() => {
                parentElement.style.maxHeight = `${parentElement.scrollHeight}px`;
            });
        }
    };

    const toggleContent = (id, parentId = null) => {
        setExpanded(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
        
        // Schedule an update for both the toggled element and its parent
        requestAnimationFrame(() => {
            const element = contentRefs.current[id];
            if (element) {
                if (!expanded[id]) {
                    element.style.maxHeight = `${element.scrollHeight}px`;
                    // If this is a sub-article, update the parent article's height
                    if (parentId) {
                        updateParentHeight(parentId);
                    }
                } else {
                    element.style.maxHeight = '0px';
                    // If this is a sub-article, update the parent article's height after collapse
                    if (parentId) {
                        setTimeout(() => updateParentHeight(parentId), 300); // Wait for sub-article collapse
                    }
                }
            }
        });
    };

    // Effect to handle height updates when expansion state changes
    useEffect(() => {
        articles.forEach(article => {
            const articleContent = contentRefs.current[article.id];
            if (articleContent) {
                if (expanded[article.id]) {
                    requestAnimationFrame(() => {
                        articleContent.style.maxHeight = `${articleContent.scrollHeight}px`;
                    });
                } else {
                    articleContent.style.maxHeight = '0px';
                }
            }
        });
    }, [expanded]);
    
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
            case 'version-control':
                return (
                    <div className='content__details' id={articleId} key={articleId}>
                        <div className='content__stack'>
                            <PrioritizeSpecificStack currentProject={currentProject}/>
                        </div>

                        <div className='content__version-control'>
                            <div className='version-control'>
                                <div className='version-control__block'>
                                    <div className='version-control__block-title'>
                                        git:&nbsp;
                                    </div>

                                    <div className='version-control__block-container'>
                                        <a href={currentProject.html_url} target='_blank' rel='noopener noreferrer'>
                                            github.com/{currentProject.name}
                                        </a>
                                    </div>
                                </div>

                                <div className='version-control__block'>
                                    <div className='version-control__block-title'>
                                        deploy:&nbsp;
                                    </div>

                                    <div className='version-control__block-container'>
                                        <a href={currentProject.homepage} target='_blank' rel='noopener noreferrer'>
                                            newsapi.org
                                        </a>
                                    </div>
                                </div>

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

                        <div className='version-control__block'>
                            <p className='content__block-quote'>
                                <blockquote>
                                    Проект основан на <a href='https://github.com/haerulmuttaqin/PopularNews'>github.com/PopularNews</a>
                                </blockquote>
                            </p>
                        </div>
                    </div>
                );
            case 'overview':
                return (
                    <div className='content__block-description'>
                        
                        <div className='content__block-media'>
                            <div className='content__block-image'>
                                <figure>
                                    <img src={imgDemo} alt='img' className='content__block-image' />
                                    {/* <figcaption className='content__block-caption'>
                                        This is a img.
                                    </figcaption> */}
                                </figure>
                            </div>


                            {/* <div className='content__block-video'>
                                <figure>
                                    <video controls className='content__block-video-element'>
                                        <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/webm" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <figcaption className='content__block-caption'>
                                        This is a description of the video.
                                    </figcaption>
                                </figure>
                            </div> */}
                        </div>
                       
                        
                        <p className='content__block-text'>
                            Мобильное приложение, для получения и отображения новостных лент в режиме реального времени с функциями управления постами и добавления их в избранное
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
                            <li className='content__block-feature-item'>Извлечение новостных лент через <a href='https://newsapi.org/'>NewsAPI.org</a> в JSON формате</li>
                            <li className='content__block-feature-item'>Реализация функционала разделение новостей на <code>категории</code></li>
                            <li className='content__block-feature-item'>Реализация функционала сохранения поста в <code>избранное</code></li>
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
                <h2 className='content__title' id='project-title'>
                    {formatContentDescription(currentProject.description)}
                </h2>

                {/* {renderArticleContent('version-control')} */}
            </div>

            <div className="content__body">
                {articles.map((article) => (
                    <article className="content__block" id={article.id} key={article.id}>
                        <h2
                            className="content__block-title"
                            onClick={() => toggleContent(article.id)}
                        >
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`faChevronDown ${expanded[article.id] ? 'rotated' : ''}`}
                            />
                            {article.title}
                        </h2>
                        <div
                            className="content__block-content"
                            ref={el => contentRefs.current[article.id] = el}
                            style={{
                                overflow: 'hidden',
                                transition: 'max-height 0.3s ease',
                                maxHeight: '0px'
                            }}
                        >
                            {renderArticleContent(article.id)}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default AndroidNewsApiProject;
