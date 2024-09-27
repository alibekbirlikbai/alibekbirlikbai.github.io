import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'

function ContactsPage() {
    const linkedin_url = 'https://www.linkedin.com/in/alibek-birlikbai'
    const github_url = 'https://github.com/alibekbirlikbai'
    const telegram = 'alibekbirlikbai'
    const email = 'alibekbirlikbai@gmail.com'
    const phone = '+7 (771) 441-45-09'

    return (
        <div className="app-container" id="contacts-page">
            <main>
                <div className="app-content">
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
                                        <FontAwesomeIcon icon={faLinkedin} style={{color: "#0077A5",}} />
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
    );
};

export default ContactsPage;