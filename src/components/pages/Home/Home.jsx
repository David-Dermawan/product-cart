import { useState } from "react";

import { products } from "../../../data/product";

import FoodCard from "../../FoodCard";
import styles from "./Home.module.css";
import emptyCart from "../../../assets/illustration-empty-cart.svg";

export default function Home() {
  const [cart, setCart] = useState({});
  const [activeCategory, setActiveCategory] = useState("Desserts");
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory,
  );

  const totalQuantity = Object.values(cart).reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existingItem = prevCart[item.name];

      if (existingItem) {
        return {
          ...prevCart,
          [item.name]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          },
        };
      }

      return {
        ...prevCart,
        [item.name]: {
          name: item.name,
          detail: item.detail,
          price: item.price,
          quantity: 1,
        },
      };
    });
  }

  function handleDecreaseQuantity(item) {
    setCart((prevCart) => {
      const existingItem = prevCart[item.name];

      if (!existingItem) return prevCart;

      if (existingItem.quantity === 1) {
        const updatedCart = { ...prevCart };
        delete updatedCart[item.name];
        return updatedCart;
      }

      return {
        ...prevCart,
        [item.name]: {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        },
      };
    });
  }

  function handleRemoveItem(item) {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[item.name];
      return updatedCart;
    });
  }

  function handleConfirmOrder() {
    setShowCustomerForm(true);
  }

  function handleSendOrder() {
    const phoneNumber = "6281380418533";

    const orderItems = Object.values(cart)
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}\n` +
          `   Quantity: ${item.quantity}\n` +
          `   Price: Rp${(Number(item.price) * item.quantity).toLocaleString()}`,
      )
      .join("\n\n");

    const message = [
      "DESSERT ORDER",
      "==============================",
      "",
      "CUSTOMER DETAILS",
      "------------------------------",
      `Name    : ${customerName.trim()}`,
      `Address : ${customerAddress.trim()}`,
      "",
      "ORDER DETAILS",
      "------------------------------",
      orderItems,
      "",
      "==============================",
      `Total Items : ${totalQuantity}`,
      `Total Price : Rp${totalPrice.toLocaleString("id-ID")}`,
      "==============================",
      "",
      "Please confirm my order.",
      "Thank you!",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  }

  return (
    <div className={styles.home}>
      <div className={styles.menuLayout}>
        <section className={styles.menuSection}>
          <nav className={styles.menuNav}>
            <button
              className={activeCategory === "Desserts" ? styles.active : ""}
              onClick={() => setActiveCategory("Desserts")}
            >
              Desserts
            </button>
            <button
              className={activeCategory === "Savory" ? styles.active : ""}
              onClick={() => setActiveCategory("Savory")}
            >
              Savory
            </button>
          </nav>
          <h1 className={styles.sectionTitle}>{activeCategory}</h1>
          <div className={styles.foodCards}>
            {filteredProducts.map((product) => (
              <FoodCard
                key={product.name}
                img={product.img}
                name={product.name}
                detail={product.detail}
                price={product.price}
                quantity={cart[product.name]?.quantity || 0}
                handleAddToCart={handleAddToCart}
                handleDecreaseQuantity={handleDecreaseQuantity}
              />
            ))}
          </div>
        </section>

        <aside className={styles.foodCart}>
          <h2 className={styles.cartTitle}>Your Cart ({totalQuantity})</h2>
          <div className={styles.emptyCartText}>
            {Object.keys(cart).length > 0 ? (
              <ul>
                {Object.values(cart).map((item) => (
                  <>
                    <li className={styles.cartItem} key={item.name}>
                      <div className={styles.cartItemInfo}>
                        <span className={styles.cartItemName}>
                          {item.detail}
                        </span>

                        <div className={styles.cartItemDetails}>
                          <span className={styles.cartItemQuantity}>
                            {item.quantity}x
                          </span>

                          <span className={styles.cartItemPrice}>
                            {`Rp${(Number(item.price) * item.quantity).toLocaleString()}`}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={styles.removeItemButton}
                        onClick={() => handleRemoveItem(item)}
                      >
                        X
                      </button>
                    </li>
                    <hr className={styles.cartSeparator} />
                  </>
                ))}
                <div className={styles.cartTotal}>
                  <p className={styles.cartTotalText}>Order Total</p>
                  <p className={styles.cartTotalPrice}>
                    Rp{totalPrice.toLocaleString()}
                  </p>
                </div>
                <button
                  className={styles.confirmOrderButton}
                  onClick={handleConfirmOrder}
                >
                  Confirm Order
                </button>

                {showCustomerForm && (
                  <div className={styles.modalOverlay}>
                    <form
                      className={styles.customerForm}
                      onSubmit={handleSendOrder}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className={styles.modalHeader}>
                        <h2>Customer Details</h2>

                        <button
                          type="button"
                          className={styles.closeModalButton}
                          onClick={() => setShowCustomerForm(false)}
                          aria-label="Close modal"
                        >
                          &times;
                        </button>
                      </div>

                      <p className={styles.modalDescription}>
                        Please enter your details to complete your order.
                      </p>

                      <div className={styles.formGroup}>
                        <label htmlFor="customerName">Full Name</label>
                        <input
                          id="customerName"
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Enter your full name"
                          autoComplete="name"
                          required
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="customerAddress">
                          Delivery Address
                        </label>
                        <textarea
                          id="customerAddress"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="Enter your complete delivery address"
                          autoComplete="street-address"
                          rows={4}
                          required
                        />
                      </div>

                      <div className={styles.modalActions}>
                        <button
                          type="button"
                          className={styles.cancelButton}
                          onClick={() => setShowCustomerForm(false)}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className={styles.submitOrderButton}
                        >
                          Submit Order
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </ul>
            ) : (
              <>
                <img
                  className={styles.emptyCartImage}
                  src={emptyCart}
                  alt="Empty cart"
                />
                <p> Your added items will appear here</p>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
