import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LeftSidebar from '../components/sidebars/left-sidebar';
import LoadingSection from '../components/html/loading-section';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'

function ContactsPage({ projects, defaultProject }) {
    const linkedin_url = 'https://www.linkedin.com/in/alibek-birlikbai'
    const github_url = 'https://github.com/alibekbirlikbai'
    const telegram = 'alibekbirlikbai'
    const email = 'alibekbirlikbai@gmail.com'
    const phone = '+7 (771) 441-45-09'


    const [currentProject, setCurrentProject] = useState(null);
    const [isProjectLoading, setIsProjectLoading] = useState(true);
    const { repo } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      setIsProjectLoading(true);
      const project = projects.find(p => p.name === repo);
      if (project) {
        setCurrentProject(project);
      } else if (projects.length > 0) {
      }
      setIsProjectLoading(false);
    }, [repo, projects, navigate, defaultProject]);

    return (
        <LoadingSection>
            <div className="app-container" >
                <LoadingSection isLoading={isProjectLoading}>
                    <LeftSidebar projects={projects} />
                </LoadingSection>
            
                <main>
                    <div className="app-content" id="contacts-page">
                        <div className="contact__blocks">
                            <div className='contact__blocks-self'>
                                <article className="contact__block">
                                    <div className="contact__block-content">
                                        <div className='contact__media-icon'>
                                            {/* <FontAwesomeIcon icon={faLinkedin} style={{color: "#0077B5",}} /> */}
                                        </div>

                                        <div className="contact__label">
                                            {/* &nbsp;phone:&nbsp; */}
                                        </div>

                                        <div className='contact__details'>
                                            {phone}
                                        </div>
                                    </div>                            
                                </article>
                                
                                <article className="contact__block">
                                    <div className="contact__block-content">
                                        <div className='contact__media-icon'>
                                            {/* <FontAwesomeIcon icon={faLinkedin} style={{color: "#0077B5",}} /> */}
                                        </div>

                                        <div className="contact__label">
                                            {/* &nbsp;e-mail:&nbsp; */}
                                        </div>

                                        <div className='contact__details'>
                                            <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className='contact__url'>
                                                {email}
                                            </a>
                                        </div>
                                    </div>                            
                                </article>
    
                                <article className="contact__block">
                                    <div className="contact__block-content">
                                        <div className='contact__media-icon'>
                                            {/* <FontAwesomeIcon icon={faTelegram} style={{color: "#0088cc",}} /> */}
                                        </div>

                                        <div className="contact__label">
                                            Telegram:&nbsp;
                                        </div>

                                        <div className='contact__details'>
                                            <a href={`https://t.me/${telegram}`} target="_blank" rel="noopener noreferrer" className='contact__url'>
                                                @{telegram}
                                            </a>
                                        </div>
                                    </div>                            
                                </article>
                            </div>

                            <div className='contact__blocks-media'>  
                                <article className="contact__block">
                                    <div className="contact__block-content">
                                        <div className='contact__media-icon'>
                                            <FontAwesomeIcon icon={faGithub} style={{color: "",}} />
                                        </div>

                                        <div className="contact__label">
                                            &nbsp;Github:&nbsp;
                                        </div>

                                        <div className='contact__details'>
                                            <a href={github_url} target="_blank" rel="noopener noreferrer" className='contact__url'>
                                                {github_url}
                                            </a>
                                        </div>
                                    </div>                            
                                </article>

                                <article className="contact__block">
                                    <div className="contact__block-content">
                                        <div className='contact__media-icon'>
                                            <FontAwesomeIcon icon={faLinkedin} style={{color: "#2f81f7",}} />
                                        </div>

                                        <div className="contact__label">
                                            &nbsp;LinkedIn:&nbsp;
                                        </div>

                                        <div className='contact__details'>
                                            <a href={linkedin_url} target="_blank" rel="noopener noreferrer" className='contact__url'>
                                                {linkedin_url}
                                            </a>
                                        </div>
                                    </div>                            
                                </article>
                            </div>

                            <div className='contact__blocks-description'>
                                <p>
                                    cv / резюме по запросу 
                                </p>
                            </div>
                        </div>
                    </div>
                </main>            
            </div>
        </LoadingSection>
    );
};

export default ContactsPage;