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
    { title: 'Фичи', id: 'features' },
    { 
        title: 'Детали', 
        id: 'details',
        subArticles: [
            { title: 'Интеграция Google Drive', id: 'integrate-google-drive' },
        ]
    },
];

function CloudUrlStorageProject({ currentProject, onUpdateArticles }) {
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
            case 'integrate-google-drive':
                return (
                    <div className='content__sub-article-container'>
                        {renderCodeBlock(`public class GoogleDriveService {
    // Подключение к Google Drive
    static Drive drive;

    static {
        try {
            drive = GoogleDriveConnector.connectGoogleDrive();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String storeBinInCloud(Bin bin) throws IOException {
        Map<String, java.io.File> fileMap = CloudUtils.createFile(bin);

        fileUploadIntoCloud(fileMap, bin);

        // return fileName
        return fileMap.entrySet().iterator().next().getKey();
    }

    public static String getBinFromCloud(String fileId) throws IOException {
        // Получаем инфо о файле по ID
        File file = drive.files().get(fileId).execute();

        // Получение потока ввода содержимого файла
        try (InputStream inputStream = drive.files().get(fileId).executeMediaAsInputStream()) {
            // Чтение содержимого файла в байтовый массив
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            byte[] contentBytes = outputStream.toByteArray();

            // Конвертация байтового массива в строку
            String fileContent = new String(contentBytes, StandardCharsets.UTF_8);
            return fileContent;
        }
    }

    public static void deleteBinFromCloud(String fileId) throws IOException {
        drive.files().delete(fileId).execute();
        System.out.println("File with ID " + fileId + " has been deleted successfully.");
    }

    private static void fileUploadIntoCloud(Map<String, java.io.File> fileMap, Bin bin) throws IOException {
        String fileName = fileMap.entrySet().iterator().next().getKey();
        java.io.File serverFile = fileMap.entrySet().iterator().next().getValue();

        // Загрузка файла на Google Drive
        File fileMetadata = new File();
        fileMetadata.setName(fileName);
        fileMetadata.setParents(Collections.singletonList(GoogleDriveConnector.folderId));
        FileContent mediaContent = new FileContent("text/plain", serverFile);
        File file = drive.files().create(fileMetadata, mediaContent)
                .setFields("id")
                .execute();

        bin.setCloud_id(file.getId());
        System.out.println("File ID: " + file.getId());

        // Удаление файла с сервера
        serverFile.delete();
    }
}`, 'java', 'integrate-google-drive')}
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
                                Для подключения к своему <b>Google Drive</b> нужно будет сгенерировать токен (<b>service-account-auth.json</b>) с permissions в <b>Google Cloud Console</b>
                            </blockquote>
                        </p>
                        <div className='content__block-media'>
                            <div className='content__block-video'>
                                <figure>
                                    <video controls className='content__block-video-element'>
                                        <source src="/video/video.cloud-url-storage.demo.mp4" type="video/webm" />
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* <figcaption className='content__block-caption'>
                                        This is a description of the video.
                                    </figcaption> */}
                                </figure>
                            </div>
                        </div>
                        
                        <p className='content__block-text'>
                            Облачный сервис позволяющий сохранять и извлекать текст по уникальным URL-адресам
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
                            <li className='content__block-feature-item'><a href='https://developers.google.com/drive/api/reference/rest/v3'>Google Drive API</a> как облачное хранилище (Google Cloud)</li>
                            <li className='content__block-feature-item'>Генерация URL адреса на основе сохраняемого текста</li>
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

export default CloudUrlStorageProject;
