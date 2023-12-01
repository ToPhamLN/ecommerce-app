import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../assets/css/Chat.css";
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineSearch } from "react-icons/ai";
import { LuMoreHorizontal } from "react-icons/lu";
import axios from "../../config/axios";
import {
  userRequest,
  conversationRequest,
} from "../../config/apiRequest";
import { Spin } from "antd";
import ConversationUser from "./ConversationUser";
import Conversation from "./Conversation";
import ChatRoom from "./ChatRoom";

const Chat = (props) => {
  const [conversations, setConversations] = useState([]);
  const [getChat, setGetChat] = useState({
    key: null,
    name: null,
  });
  const { setShow } = props;
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);

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
          {getChat.key ? (
            <ChatRoom getChat={getChat} setShow={setShow} />
          ) : (
            <React.Fragment>
              <div className="header__chatbox">
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
              <div className="no__conversation">
                Please select a conversation...
              </div>
            </React.Fragment>
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
