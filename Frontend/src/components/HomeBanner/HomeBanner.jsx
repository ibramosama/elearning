import { Container, Row, Col, Form} from "react-bootstrap";
import homebanner from "../../assets/images/headerbanner.png"
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import styles from "./homebanner.module.css";

export const HomeBanner = () => {
  


  return (
    <section className={styles.banner} id="home">
      <Container>
        <Row className={styles["aligh-items-center"]}>
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={`${isVisible ? "animate__animated animate__fadeIn" : ""} ${styles.content}`}>
                <span className={styles.tagline}>Start To Success</span>
                <h1>{`Access To 5500+ Courses from 480 Instructors & Institutions`}</h1>
                <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
                <span className={styles.tagline}>Take your learning organisation to the next level.</span>
                <Form className={`d-flex ${styles.form}`}>
                    <Form.Control type="search" placeholder="Search" className={`me-2 rounded-pill ${styles.searchInput}`} aria-label="Search"/>
                </Form>

              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={`${isVisible ? "animate__animated animate__zoomIn" : ""} ${styles.image}`}>
                  <img src={homebanner} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
