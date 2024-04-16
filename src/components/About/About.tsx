import {
  AssignmentOutlined,
  BookOutlined,
  MenuBookOutlined,
} from "@mui/icons-material";
import styles from "./about.module.scss";

type Props = {};

const About = (props: Props) => {
  return (
    <section className={styles.about}>
      <div className={styles.title}>
        <h3>Plan your trip now</h3>
        <h2>Quick & easy car rental</h2>
      </div>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <MenuBookOutlined style={{ fontSize: "80px" }} color="primary" />
          <h3>Select Car</h3>
          <p>
            We offers a big range of vehicles for all your driving needs. We
            have the perfect car to meet your needs
          </p>
        </div>

        <div className={styles.box}>
          <BookOutlined style={{ fontSize: "80px" }} color="primary" />
          <h3>Contact Operator</h3>
          <p>
            Our knowledgeable and friendly operators are always ready to help
            with any questions or concerns
          </p>
        </div>

        <div className={styles.box}>
          <AssignmentOutlined style={{ fontSize: "80px" }} color="primary" />
          <h3>Let's Drive</h3>
          <p>
            Whether you're hitting the open road, we've got you covered with our
            wide range of cars
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
