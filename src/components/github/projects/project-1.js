import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/atom-one-light.css';

// Register languages (code highlight)
hljs.registerLanguage('java', java);
hljs.registerLanguage('python', python);

function Project1({ setProject, setLinks, projectTitle }) {
    const github_repo = 'repo'
    const articles = [
        { title: 'Github', id: 'project-title' },
        { title: 'Описание', id: 'info' },
        { title: 'Демо', id: 'demo' },
        { title: 'Фичи', id: 'features' },
        { title: 'Детали', id: 'details' },
    ];

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

        
        if (projectTitle) {
            setProject(projectTitle);
        }

        setLinks(articles);
    }, [projectTitle, setLinks, setProject]);

    // Function to render different content for each article based on the id
    const renderArticleContent = (articleId) => {
        switch (articleId) {
            case 'github':
                return (
                    <div className='content__details' id={articleId} key={articleId}>
                        <div className='content__stack'>
                            <ul className='stack-list'>
                                <li className='stack-list__item'>Java</li>
                                <li className='stack-list__item'>Github Actions</li>
                                <li className='stack-list__item'>GraphQL</li>
                            </ul>
                        </div>

                        <div className='content__version-control'>
                            <div className='version-control'>
                                <p className='version-control__url'>
                                    <span>github:&nbsp;</span>
                                    <a href='fff' target='_blank' rel='noopener noreferrer'>
                                        /alibekbirlikbai
                                    </a>
                                </p>
                                <p className='version-control__last-pull-request'>
                                    <span>pull-request:&nbsp;</span>
                                    <a href='fff' target='_blank' rel='noopener noreferrer'>
                                        Новая фича
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            case 'info':
                return (
                    <div className='content__block-description'>
                        <p className='content__block-text'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut sagittis erat, ut elementum nisi. Ut condimentum velit dapibus metus rutrum, ac faucibus ligula posuere. Curabitur elementum metus mauris, non laoreet ligula mattis in. Aenean sagittis convallis ligula ut volutpat. Vivamus suscipit diam id pretium luctus.
                        </p>
                    </div>
                );
            case 'demo':
                return (
                    <div className='content__block-description'>
                        <div className='content__block-media'>
                            <div className='content__block-image'>
                                <figure>
                                    <img src='/img/test.png' alt='Description of the image' className='content__block-image' />
                                    <figcaption className='content__block-caption'>
                                        This is a description of the image.
                                    </figcaption>
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
                    </div>
                );
            case 'features':
                return (
                    <div className='content__block-description'>
                        <ul className='content__block-feature-list'>
                            <li className='content__block-feature-item'>feature</li>
                            <li className='content__block-feature-item'>feature</li>
                            <li className='content__block-feature-item'>feature</li>
                        </ul>
                    </div>
                );
            case 'details':
                return (
                    <div className='content__block-description'>
                        <p className='content__block-text'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut sagittis erat, ut elementum nisi. Ut condimentum velit dapibus metus rutrum, ac faucibus ligula posuere. Curabitur elementum metus mauris, non laoreet ligula mattis in. Aenean sagittis convallis ligula ut volutpat. Vivamus suscipit diam id pretium luctus. Aliquam bibendum quam vel dolor elementum, tempus commodo diam molestie. Maecenas non ligula lacinia, gravida leo ut, venenatis dui. Duis volutpat tempus est vitae tincidunt. Duis dolor leo, tempor et congue sit amet, rutrum quis ex. Integer ornare nulla dui. Integer eu risus tellus. Donec a felis turpis.
                        </p>

                        <div className='content__block-code'>
                            <div className='content__code-header'>
                                <span className='content__code-language'>{javaLanguage}</span>
                            </div>

                            <pre>
                                <code ref={javaCodeRef}>
                                    {`public class HelloWorld {
    public static void main(String[] args) {
    System.out.println("Hello, World!");
    }
}`}
                                </code>
                            </pre>
                        </div>

                        <div className='content__block-code'>
                            <div className='content__code-header'>
                                <span className='content__code-language'>{pythonLanguage}</span>
                            </div>

                            <pre>
                                <code ref={pythonCodeRef}>
                                    {`# Python program to swap two variables
x = 5
y = 10

# To take inputs from the user
#x = input('Enter value of x: ')
#y = input('Enter value of y: ')

# create a temporary variable and swap the values
temp = x
x = y
y = temp

print('The value of x after swapping: {}'.format(x))
print('The value of y after swapping: {}'.format(y))
`}
                                </code>
                            </pre>
                        </div>
                        
                        <p className='content__block-text'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut sagittis erat, ut elementum nisi. Ut condimentum velit dapibus metus rutrum, ac faucibus ligula posuere. Curabitur elementum metus mauris, non laoreet ligula mattis in. Aenean sagittis convallis ligula ut volutpat. Vivamus suscipit diam id pretium luctus. Aliquam bibendum quam vel dolor elementum, tempus commodo diam molestie. Maecenas non ligula lacinia, gravida leo ut, venenatis dui. Duis volutpat tempus est vitae tincidunt. Duis dolor leo, tempor et congue sit amet, rutrum quis ex. Integer ornare nulla dui. Integer eu risus tellus. Donec a felis turpis.
                        </p>
                    </div>
                );
            default:
                return <p>No content available</p>;
        }
    };

    return (
        <section className='content'>
            <div className='content__header'>
                <h1 className='content__title' id='project-title'>{projectTitle}</h1>

                {renderArticleContent('github')}
            </div>

            <div className='content__body'>
                {articles
                    .filter(article => article.id != 'github')
                    .map(article => (
                        <article className='content__block' key={article.id} id={`article-${article.id}`}>
                            <h2 id={article.id} className='content__block-title'>{article.title}</h2>
                            
                            {renderArticleContent(article.id)}
                        </article>
                ))}
            </div>
        </section>
    );
};

export default Project1;
