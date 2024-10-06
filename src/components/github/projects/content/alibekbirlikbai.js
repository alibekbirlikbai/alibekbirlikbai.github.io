import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

import PullRequestList from '../../github-api-integration/fetch-pullrequests'
import CalculateLastUpdate from '../../github-api-integration/calculate-last-update'
import PrioritizeSpecificStack from '../../../html/prioritizeSpecificStack'

import formatContentDescription from '../../../html/formatContentDescription'

const articles = [
    { title: 'Version Control', id: 'version-control' },
    // { title: 'Demo', id: 'demo' },
    { title: 'Описание', id: 'overview' },
    { title: 'Фичи', id: 'features' },
    { 
        title: 'Детали', 
        id: 'details',
        subArticles: [
            { title: 'GraphQL запрос', id: 'query-graphql' },
            { title: 'merge_branch.yaml (workflow)', id: 'workflow-merge-branch' },
            { title: 'readme_update.yaml (workflow)', id: 'workflow-readme-update' },
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
            case 'workflow-readme-update':
                return (
                    <div className='content__sub-article-container'>
                        {renderCodeBlock(`name: Update README

on:
  push:
    branches:
      - test
      - main
  workflow_dispatch:
  schedule:
    - cron: '8,28,48 * * * *'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repo
        uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: "3.10"

      - uses: actions/cache@v2
        name: Configure pip caching
        with:
          path: ~/.cache/pip
          key: \${{ runner.os }}-pip-\${{ hashFiles('**/requirements.txt') }}
          restore-keys: |
            \${{ runner.os }}-pip-

      - name: Install Python dependencies
        run: |
          python -m pip install -r requirements.txt

      - name: Update README, pull requests, and commits
        env:
          REPO_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        run: |-
          python build_readme.py
          cat README.md
          cat md/pull_requests.md
          cat md/commits.md
          cat md/releases.md

      - name: Commit and push if changed
        run: |-
          git diff
          git config --global user.email "actions@users.noreply.github.com"
          git config --global user.name "readme-bot"
          git add -A
          git commit -m "feat(readme-bot): auto-update content" || exit 0
          git push`, 'yaml', 'workflow-readme-update')}
                    </div>
                );
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
            case 'query-graphql':
                return (
                    <div className='content__sub-article-container'>
                        {renderCodeBlock(`query {
  search(first: 100, type: REPOSITORY, query: "is:public owner:alibekbirlikbai sort:updated", after: AFTER) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      __typename
      ... on Repository {
        name
        url
        pullRequests(first: 100, states: [OPEN, MERGED], orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            title
            url
            state
            updatedAt
            createdAt
            merged
            mergedAt
            author {
              login
            }
            commits {
              totalCount
            }
          }
        }
        refs(first: 100, refPrefix: "refs/heads/") {
          nodes {
            name
            target {
              ... on Commit {
                history(first: 1) {  # Последний коммит для текущей ветки
                  totalCount
                  nodes {
                    message
                    committedDate
                    url
                    author {
                      user {
                        login
                      }
                    }
                    oid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`, 'graphql', 'query-graphql')}
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
                                <h3 className='sub-article-title'>{subArticle.title}</h3>
        
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
                                        Github:&nbsp;
                                    </div>

                                    <div className='version-control__block-container'>
                                        <a href={currentProject.html_url} target='_blank' rel='noopener noreferrer'>
                                            {currentProject.full_name}
                                        </a>
                                    </div>
                                </div>

                                <div className='version-control__block'>
                                    <div className='version-control__block-title'>
                                        Deploy:&nbsp;
                                    </div>

                                    <div className='version-control__block-container'>
                                        <a href="https://github.com/alibekbirlikbai/alibekbirlikbai/actions" target='_blank' rel='noopener noreferrer'>
                                            alibekbirlikbai/actions
                                        </a>
                                    </div>
                                </div>

                                <div className='version-control__block'>
                                    <div className='version-control__block-title'>
                                        Pull-Request:&nbsp;
                                    </div>

                                    <div className='version-control__block-container'>
                                        <PullRequestList currentProject={currentProject} />
                                    </div>
                                </div>

                                <div className='version-control__block'>
                                    <p className='content__block-quote'>
                                        <blockquote>
                                            {/* <span className='quote-title'>Note:</span>  */}
                                            Проект основан на <a href='https://github.com/simonw/simonw'>github.com/simonw</a> и статье <a href='https://simonwillison.net/2020/Jul/10/self-updating-profile-readme/'>"Building a self-updating profile README for GitHub"</a>
                                        </blockquote>
                                    </p>
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

                    </div>
                );
            case 'overview':
                return (
                    <div className='content__block-description'>
                        <p className='content__block-quote'>
                            <blockquote>
                                <span className='quote-title'>Note:</span> <code>rebase/merge</code> при <code>push</code> делается из-за github бота (readme-bot), который периодический обновляет ветку 
                            </blockquote>
                        </p>

                        <div className='content__block-media'>
                            {/* <div className='content__block-image'>
                                <figure>
                                    <img src='' alt='img' className='content__block-image' />
                                    <figcaption className='content__block-caption'>
                                        This is a img.
                                    </figcaption>
                                </figure>
                            </div> */}

                            <div className='content__block-video'>
                                <figure>
                                    <video controls className='content__block-video-element'>
                                        <source src="/video/video.ci-cd.demo.mp4" type="video/webm" />
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
                            <li className='content__block-feature-item'>Триггер на обновление Readme.md при изменениях на удаленной ветке (<code>main</code>/<code>test</code>)</li>
                            <li className='content__block-feature-item'>Слияние веток dev / test при изменениях на ветке <code>dev</code></li>
                            <li className='content__block-feature-item'>Cкрипт на Python для получения последних commit и pull-request аккаунта (запрос через <a href='https://docs.github.com/en/graphql/overview/about-the-graphql-api'>Github GraphQL API</a>)</li>
                            <li className='content__block-feature-item'>Интеграция <code>GITHUB_TOKEN</code> как <a href='https://github.com/orgs/community/discussions/42133'>env variable</a></li>
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

                {renderArticleContent('version-control')}
            </div>

            <div className='content__body'>
                {articles
                    .filter(article => article.id != 'version-control')
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
