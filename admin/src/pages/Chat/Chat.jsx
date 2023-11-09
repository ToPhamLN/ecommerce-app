import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../assets/css/Chat.css";
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineSearch } from "react-icons/ai";
import {
  LuMoreHorizontal,
  LuSendHorizonal,
} from "react-icons/lu";
import axios from "../../config/axios";
import {
  userRequest,
  conversationRequest,
  messageRequest,
} from "../../config/apiRequest";
import { Spin } from "antd";
import ConversationUser from "./ConversationUser";
import Conversation from "./Conversation";
import Message from "./Message";

const Chat = (props) => {
  const [conversations, setConversations] = useState([]);
  const [getChat, setGetChat] = useState(null);
  const { setShow } = props;
  const [messages, setMessages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = useRef();

  useEffect(() => {
    messagesRef.current.scrollTop =
      messagesRef.current.scrollHeight;
  }, [getChat]);

  const handleGetUser = async () => {
    try {
      setLoader(true);
      const res = await axios.get(userRequest.search, {
        params: {
          search: search,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const handleGetConversation = async () => {
    try {
      const res = await axios.get(conversationRequest.getAll);
      setConversations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetUser();
    handleGetConversation();
  }, [search]);

  const handleGetMessages = async () => {
    try {
      const res = await axios.get(
        `${messageRequest.getByConversation}/${getChat}`
      );
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetMessages();
  }, [getChat]);

  const handleNewMessage = async () => {
    setNewMessage("");
    try {
      const form = {
        conversationId: getChat,
        text: newMessage,
      };
      await axios.post(messageRequest.create, form);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <div className="container__chat">
        <div className="conversation">
          <div className="search__conversation">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
            <span>
              <AiOutlineSearch />
            </span>
          </div>
          <div className="conversation__list">
            {loader ? (
              <Spin size="large" />
            ) : (
              user.map((user, index) => (
                <ConversationUser
                  key={index}
                  user={user}
                  setGetChat={setGetChat}
                />
              ))
            )}
            {!search &&
              conversations.map((conversation, index) => (
                <Conversation
                  key={index}
                  conversation={conversation}
                  setGetChat={setGetChat}
                />
              ))}
          </div>
        </div>
        <div className="chatbox">
          {getChat ? (
            <React.Fragment>
              <div className="header__chatbox">
                <span className="name__chatbox">
                  Lorem ipsum dolor
                </span>
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
              <div
                className="content__chatbox"
                ref={messagesRef}
              >
                {messages.map((message, index) => (
                  <Message key={index} message={message} />
                ))}
              </div>
              <div className="send__chatbox">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={() => handleNewMessage()}>
                  <LuSendHorizonal />
                </button>
              </div>
            </React.Fragment>
          ) : (
            <div className="no__conversation" ref={messagesRef}>
              Please select a conversation...
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

Chat.propTypes = {
  setShow: PropTypes.func.isRequired,
};

export default Chat;
