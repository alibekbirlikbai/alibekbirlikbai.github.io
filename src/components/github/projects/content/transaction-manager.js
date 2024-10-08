import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import PullRequestList from '../../github-api-integration/fetch-pullrequests'
import CalculateLastUpdate from '../../github-api-integration/calculate-last-update'
import PrioritizeSpecificStack from '../../../html/prioritizeSpecificStack'

import videoDemo from '../../../../assets/video/video.transaction-manager.demo.mp4'

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
            { title: 'Интеграция OpenExchangeRates.org', id: 'integrate-openexchangerates' },
        ]
    },
];

function TransactionManagerProject({ currentProject, onUpdateArticles }) {
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
            case 'integrate-openexchangerates':
                return (
                    <div className='content__sub-article-container'>
                        <p className='content__block-text'>
                            Метод обращяется к API <code>/historical/*.json</code> от <a href='https://docs.openexchangerates.org/reference/historical-json'>https://openexchangerates.org/api</a>
                        </p>

                        {renderCodeBlock(`// ...
public Mono<CurrencyApiResponse> getCurrencyList_Historical(String dateTime) {
    return webClient.get()
            .uri(uriBuilder ->
                    uriBuilder.scheme("https")
                            .host(basePath)
                            .path("/api/historical/" + dateTime + ".json")
                            .queryParam("app_id", app_id)
                            .build())
            .retrieve()
            .bodyToMono(CurrencyApiResponse.class);
}
// ...`, 'java', 'integrate-openexchangerates-ddd')}

                        <p className='content__block-text'>
                            За получение и обработку валют отвечает - <code>getCurrencyList()</code>
                        </p>

                        {renderCodeBlock(`@Override
public Mono<List<Currency>> getCurrencyList(ZonedDateTime transaction_dateTime) {
    String currentDate_formatted = CurrencyServiceUtils.parseZoneDateTime(CurrencyServiceUtils.getCurrentDateTime());
    String transactionDate_formatted = CurrencyServiceUtils.parseZoneDateTime(transaction_dateTime);
    LocalDate parsedCurrentDate = LocalDate.parse(currentDate_formatted);
    LocalDate parsedTransactionDate = LocalDate.parse(transactionDate_formatted);

    CurrencyRequest pastCurrencyRequest = requestRepository.findByFormatted_timestamp(transactionDate_formatted);
    if (pastCurrencyRequest != null) {
        System.out.println("Get data from local db!!! (currencyList at:" + pastCurrencyRequest.getFormatted_timestamp() + ")");

        // Список валют взят из БД (запрос в openexchangerates.org/api/ НЕ делается)
        currencyList = currencyRepository.findAllByCurrencyRequestID(pastCurrencyRequest.getId());
        return checkForUnavailableRate(transaction_dateTime, currencyList);
    } else {
        return Mono.defer(() -> {
            if (parsedTransactionDate.isEqual(parsedCurrentDate)) {
                return openExchangeRatesClient.getCurrencyList_Latest()
                        .map(response -> {
                            response.setTimestamp(currentDate_formatted);
                            return response;
                        })
                        .flatMap(response -> createCurrenciesFromResponse(Mono.just(response)))
                        .flatMap(currencyList -> checkForUnavailableRate(transaction_dateTime, currencyList));
            } else if (parsedTransactionDate.isBefore(parsedCurrentDate)) {
                return openExchangeRatesClient.getCurrencyList_Historical(transactionDate_formatted)
                        .map(response -> {
                            response.setTimestamp(transactionDate_formatted);
                            return response;
                        })
                        .flatMap(response -> createCurrenciesFromResponse(Mono.just(response)))
                        .flatMap(currencyList -> checkForUnavailableRate(transaction_dateTime, currencyList));
            } else {
                return Mono.error(new IllegalArgumentException("Transaction date cannot be in the future!!! (BACK-TO-THE-FUTURE)"));
            }
        });
    }
}`, 'java', 'integrate-openexchangerates')}
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
                                        Pull-Request:&nbsp;
                                    </div>

                                    <div className='version-control__block-container'>
                                        <PullRequestList currentProject={currentProject} />
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
                    </div>
                );
            case 'overview':
                return (
                    <div className='content__block-description'>

                        {/*
                            <p className='content__block-quote'>
                                <blockquote>
                                    <span className='quote-title'>Note:</span> Разработке прототипа сервиса, который можно легко интегрировать в уже готовую систему (банк)
                                </blockquote>
                            </p>
                        */}

                        <div className='content__block-media'>
                            <div className='content__block-video'>
                                <figure>
                                    <video controls className='content__block-video-element'>
                                        <source src={videoDemo} type="video/webm" />
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* <figcaption className='content__block-caption'>
                                        This is a description of the video.
                                    </figcaption> */}
                                </figure>
                            </div>
                        </div>
                        
                        <p className='content__block-text'>
                            Сервис позволяет обрабатывать валютные транзакции, и устанавливать / следить за месячным лимитом для различных категорий расходов
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
                            <li className='content__block-feature-item'>Интеграция <a href='https://docs.openexchangerates.org/reference/api-introduction'>OpenExchangeRates.org</a> для получения <code>актуальных</code> и <code>исторических</code> курсов валют в JSON формате</li>
                            <li className='content__block-feature-item'>Реализация сервисов конфигурации через <a href='https://medium.com/design-microservices-architecture-with-patterns/service-registry-pattern-75f9c4e50d09'>Service Registry Pattern</a> / <a href='https://docs.spring.io/spring-cloud-config/docs/current/reference/html/#_spring_cloud_config_server'>Spring Cloud Config Server</a> / <a href='https://microservices.io/patterns/apigateway.html#solution'>API Gateway Pattern</a></li>
                        </ul>
                    </div>
                );
            case 'details':
                return (
                    <div className='content__block-description'>
                        <p className='content__block-quote'>
                            <blockquote>
                                docs для - <b>code</b> / <b>API endpoints</b> / <b>quickstart</b> есть в <a href='https://github.com/alibekbirlikbai/transaction-manager'>Readme.md</a>
                            </blockquote>
                        </p>

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

export default TransactionManagerProject;
