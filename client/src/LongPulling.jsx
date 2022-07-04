import axios from "axios";
import React, { useEffect, useState } from "react";

const LongPulling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/get-messages");
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (e) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSend = async () => {
    await axios.post("http://localhost:5000/new-messages", {
      message: value,
      id: Date.now(),
    });
  };

  return (
    <div>
      <div>
        <input onChange={onChangeInput} type={"text"} />
        <button onClick={onSend}>Отправить</button>
      </div>
      <div>
        {messages.map((mess, i) => (
          <div key={i}>{mess.message}</div>
        ))}
      </div>
    </div>
  );
};

export default LongPulling;
