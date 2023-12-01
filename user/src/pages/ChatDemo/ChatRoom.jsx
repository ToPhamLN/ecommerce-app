import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  LuMoreHorizontal,
  LuSendHorizonal,
} from "react-icons/lu";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "../../config/axios";
import { messageRequest } from "../../config/apiRequest";
import Message from "./Message";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const ChatRoom = (props) => {
  const { getChat, setShow, currentChat } = props;
  const { userInfo } = useSelector((state) => state.user);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const messagesRef = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    // socket.current.on("getMessage", (data) => {
    //   setArrivalMessage({
    //     senderId: data.senderId,
    //     text: data.text,
    //     createdAt: Date.now(),
    //   });
    // });
  }, [getChat]);

  useEffect(() => {
    arrivalMessage &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, getChat]);

  useEffect(() => {
    socket?.current.emit("addUser", userInfo._id);
    socket?.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [userInfo, getChat]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop =
        messagesRef.current.scrollHeight;
    }
  }, [messages, getChat]);

  const handleGetMessages = async () => {
    try {
      const res = await axios.get(
        `${messageRequest.getByConversation}/${getChat.key}`
      );
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetMessages();
  }, [getChat, messages]);

  const handleNewMessage = async () => {
    setNewMessage("");
    socket.current.emit("sendMessage", {
      senderId: userInfo._id,
      receiverId: getChat.id,
      text: newMessage,
    });
    try {
      const form = {
        conversationId: getChat.key,
        text: newMessage,
      };
      await axios.post(messageRequest.create, form);
      handleGetMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <div className="header__chatbox">
        <span className="name__chatbox">{getChat.name}</span>
        <span className="moreoptions item__header">
          <LuMoreHorizontal />
        </span>
        <div
          className="exit item__header"
          onClick={() => setShow((p) => !p)}
        >
          <TiDeleteOutline />
        </div>
      </div>
      <div className="content__chatbox" ref={messagesRef}>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <div className="send__chatbox">
        <input
          type="text"
          placeholder="Write something..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={() => handleNewMessage()}>
          <LuSendHorizonal />
        </button>
      </div>
    </React.Fragment>
  );
};

ChatRoom.propTypes = {
  getChat: PropTypes.object,
  setShow: PropTypes.func,
  currentChat: PropTypes.object,
};

export default ChatRoom;
