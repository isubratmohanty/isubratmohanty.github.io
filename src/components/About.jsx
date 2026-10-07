import { useInView } from '../hooks/useInView';
import { FiMapPin } from 'react-icons/fi';
import './About.css';

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" ref={ref} className={`about section-reveal ${inView ? 'is-visible' : ''}`}>
      <p className="section-title">About</p>
      <h2 className="section-heading">How I approach production engineering</h2>

      <div className="about__intro">
        <div className="about__photo">
          <img
            src="/photo.jpg"
            alt="Subrat Mohanty"
            className="about__photo-img"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="about__photo-placeholder" aria-hidden>SM</div>
        </div>
        <div className="about__intro-text">
          <p>
            I work across site reliability, DevOps, and cloud platform engineering, combining
            hands-on troubleshooting with technical leadership, incident response, secure delivery,
            and practical automation.
          </p>
          <p>
            My experience spans <strong>DataPoem</strong>, independent cloud consulting,
            <strong> Cognizant</strong>, and <strong>IBM</strong>, with a consistent focus on
            measurable reliability and maintainable production systems.
          </p>
          <div className="about__meta">
            <span className="about__location">
              <FiMapPin /> Bengaluru, India
            </span>
            <span className="about__availability">
              <span className="about__avail-dot" /> Open to SRE, DevOps & Cloud Platform roles
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
