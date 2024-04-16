import styles from "./hero.module.scss";
import Button from "../UI/Button/Button";
import HeroImg from "../../assets/images/landing.jpg";

const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.text}>
        <h4>Start improve now</h4>
        <h1>
          With our <span>free</span> learning service
        </h1>
        <p>
          Rent the car of your dreams. Unbeatable prices, unlimited miles,
          flexible pick-up options and much more.
        </p>
        <div className={styles.buttons}>
          <Button type="primary">Aviable modules</Button>
        </div>
      </div>
      <img className={styles.image} alt="hero-img" src={HeroImg} />
    </section>
  );
};

export default Hero;
