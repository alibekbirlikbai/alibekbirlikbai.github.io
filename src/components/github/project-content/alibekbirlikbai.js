import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

import PullRequestList from '../fetch-pullrequests'
import CalculateLastUpdate from '../calculate-last-update'

const articles = [
    { title: 'Github', id: 'github' },
    // { title: 'Demo', id: 'demo' },
    { title: 'Описание', id: 'overview' },
    { title: 'Фичи', id: 'features' },
    { 
        title: 'Детали', 
        id: 'details',
        subArticles: [
            { title: 'readme_update.yaml (workflow)', id: 'workflow-readme-update' },
            { title: 'merge_branch.yaml (workflow)', id: 'workflow-merge-branch' },
            { title: 'GraphQL запрос', id: 'query-graphql' },
        ]
    },
];

function GithubReadmeProject({ currentProject, onUpdateArticles }) {
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
            case 'workflow-merge-branch':
                return (
                    <div className='content__sub-article-container'>
                        {renderCodeBlock(`name: Merge 'Dev' to 'Test'

on:
  push:
    branches:
      - dev
  workflow_dispatch:
  schedule:
    - cron: '8,28,48 * * * *'

jobs:
  merge_dev_to_test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: Set up Git for merging
        run: |
          git config --global user.email "actions@users.noreply.github.com"
          git config --global user.name "push-bot"

      - name: Merge 'dev' into 'test'
        run: |
          git checkout test
          git merge origin/dev --strategy-option theirs || (echo "Conflicts detected, attempting to resolve..." && git merge --abort && exit 1)
          git push origin test

      - name: Trigger Update README workflow
        if: success()  # Only trigger if the merge was successful
        run: |
          curl -X POST \
            -H "Authorization: token \${{ secrets.GITHUB_TOKEN }}" \
            -H "Accept: application/vnd.github.v3+json" \
            https://api.github.com/repos/alibekbirlikbai/alibekbirlikbai/actions/workflows/readme_update.yaml/dispatches \
            -d '{"ref": "test"}'`, 'yaml', 'workflow-merge-branch')}
                        </div>
                    );
            // case 'query-graphql':
            //     return (
            //         <div className='content__sub-article-container'>

            //         </div>
            //     );
            case 'workflow-readme-update':
                return (
                    <div className='content__sub-article-container'>
                        {renderCodeBlock(`name: Merge 'Dev' to 'Test'

on:
  push:
    branches:
      - dev
  workflow_dispatch:
  schedule:
    - cron: '8,28,48 * * * *'

jobs:
  merge_dev_to_test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: Set up Git for merging
        run: |
          git config --global user.email "actions@users.noreply.github.com"
          git config --global user.name "push-bot"

      - name: Merge 'dev' into 'test'
        run: |
          git checkout test
          git merge origin/dev --strategy-option theirs || (echo "Conflicts detected, attempting to resolve..." && git merge --abort && exit 1)
          git push origin test

      - name: Trigger Update README workflow
        if: success()  # Only trigger if the merge was successful
        run: |
          curl -X POST \
            -H "Authorization: token \${{ secrets.GITHUB_TOKEN }}" \
            -H "Accept: application/vnd.github.v3+json" \
            https://api.github.com/repos/alibekbirlikbai/alibekbirlikbai/actions/workflows/readme_update.yaml/dispatches \
            -d '{"ref": "test"}'`, 'yaml', 'workflow-readme-update')}
                        </div>
                    );
            
            case 'query-graphql':
                return (
                    <div className='content__sub-article-container'>
                        {renderCodeBlock(`name: Merge 'Dev' to 'Test'

on:
push:
branches:
  - dev
workflow_dispatch:
schedule:
- cron: '8,28,48 * * * *'

jobs:
merge_dev_to_test:
runs-on: ubuntu-latest
steps:
  - name: Checkout repository
    uses: actions/checkout@v2
    with:
      fetch-depth: 0

  - name: Set up Git for merging
    run: |
      git config --global user.email "actions@users.noreply.github.com"
      git config --global user.name "push-bot"

  - name: Merge 'dev' into 'test'
    run: |
      git checkout test
      git merge origin/dev --strategy-option theirs || (echo "Conflicts detected, attempting to resolve..." && git merge --abort && exit 1)
      git push origin test

  - name: Trigger Update README workflow
    if: success()  # Only trigger if the merge was successful
    run: |
      curl -X POST \
        -H "Authorization: token \${{ secrets.GITHUB_TOKEN }}" \
        -H "Accept: application/vnd.github.v3+json" \
        https://api.github.com/repos/alibekbirlikbai/alibekbirlikbai/actions/workflows/readme_update.yaml/dispatches \
        -d '{"ref": "test"}'`, 'yaml', 'query-graphql')}
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
            //                             <a href={currentProject.homepage} target='_blank' rel='noopener noreferrer'>
            //                                 {currentProject.homepage}
            //                             </a>
            //                         </div>
            //                     </div>

            //                     <div className='version-control__block'>
            //                         <div className='version-control__block-title'>
            //                             deployment:&nbsp;
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
                        <p className='content__block-quote'>
                            <blockquote>
                                Проект вдохновлен <a href='https://github.com/simonw/simonw'>github.com/simonw</a> и статьей <a href='https://simonwillison.net/2020/Jul/10/self-updating-profile-readme/'>"Building a self-updating profile README for GitHub"</a>
                            </blockquote>
                        </p>

                        <div className='content__block-media'>
                            {/* <div className='content__block-image'>
                                <figure>
                                    <img src='/img/site-design.png' alt='img' className='content__block-image' />
                                    <figcaption className='content__block-caption'>
                                        This is a img.
                                    </figcaption>
                                </figure>
                            </div> */}

                            <div className='content__block-video'>
                                <figure>
                                    <video controls className='content__block-video-element'>
                                        <source src="" type="video/webm" />
                                        Your browser does not support the video tag.
                                    </video>
                                    {/* <figcaption className='content__block-caption'>
                                        This is a description of the video.
                                    </figcaption> */}
                                </figure>
                            </div>
                        </div>

                        <p className='content__block-text'>
                            Скрипт для динамического обновления Readme.md отслеживающий состояния <code>commits</code> и <code>pull-requests</code> Github аккаунта
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
                            <li className='content__block-feature-item'>Запланированное обновление Readme.md по <a href='https://medium.com/@burakkara010/creating-a-recurring-github-actions-workflow-with-cron-jobs-15ce9e41f417' target='_blank'>расписанию</a> каждые 20 мин</li>
                            <li className='content__block-feature-item'>Триггер на обновление Readme.md при изменениях на удаленной ветке (<code>main</code> / <code>test</code>)</li>
                            <li className='content__block-feature-item'>Слияние веток dev / test при изменениях на ветке <code>dev</code></li>
                            <li className='content__block-feature-item'>Cкрипт на Python для получения последних commit и pull-request аккаунта (запрос через <a href='https://docs.github.com/en/graphql/overview/about-the-graphql-api'>Github GraphQL API</a>)</li>
                            <li className='content__block-feature-item'>Интеграция <a href='https://github.com/orgs/community/discussions/42133'>Github PAT токена как env variable</a></li>
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

export default GithubReadmeProject;
