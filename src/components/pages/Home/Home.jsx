import FoodCard from "../../FoodCard";
import styles from "./Home.module.css";
import cheeseCake from "../../../assets/cheesecake.jpg";

export default function Home() {
  return (
    <div>
      <FoodCard img={cheeseCake} name="CheeseCake" detail="Cheese" price="20" />
    </div>
  );
}
