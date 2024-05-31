import { useState } from "react";
import "./styles.css";

export default function App() {
  const [price, setPrice] = useState(0);
  const [serviceTip, setServiceTip] = useState(0);
  const [friendServiceTip, setFriendServiceTip] = useState(0);

  function handlePrice(event) {
    setPrice(parseFloat(event.target.value));
  }

  function handleReset() {
    setPrice(0);
    setServiceTip(0);
    setFriendServiceTip(0);
  }
  const tip = (price * (serviceTip + friendServiceTip)) / 2 / 100;

  return (
    <div className="App">
      <Bill price={price} onChange={handlePrice} />
      <Service tip={serviceTip} onChange={setServiceTip}>
        How did you like the service?
      </Service>
      <Service tip={friendServiceTip} onChange={setFriendServiceTip}>
        How did your friend like the service?
      </Service>

      {price > 0 && (
        <>
          <Billing price={price} serviceTip={serviceTip} tip={tip} />
          <Reset onClick={handleReset} />
        </>
      )}
    </div>
  );
}
function Bill({ price, onChange }) {
  return (
    <div>
      <label> How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill-value"
        value={price}
        onChange={onChange}
      />
    </div>
  );
}

function Service({ onChange, children, tip }) {
  return (
    <div>
      <label>{children}</label>
      <select value={tip} onChange={(e) => onChange(Number(e.target.value))}>
        <option value="0">Dissatisfied(0%)</option>
        <option value="5">It was okay(5%)</option>
        <option value="10">it was good(10%)</option>
        <option value="20">Absolutely amazing(20%)</option>
      </select>
    </div>
  );
}

function Billing({ price, serviceTip, tip }) {
  const total = { price } + ({ serviceTip } * price) / 100;

  return (
    <div>
      <h3>
        Your pay ${price + tip} (${price} + ${tip} tip)
      </h3>
    </div>
  );
}

function Reset({ onClick }) {
  return <button onClick={onClick}> Reset</button>;
}
