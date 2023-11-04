import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../../assets/css/Chat.css";
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineSearch } from "react-icons/ai";
import {
  LuMoreHorizontal,
  LuMoreVertical,
  LuSendHorizonal,
} from "react-icons/lu";
import { Avatar } from "antd";

const Chat = (props) => {
  const { setShow } = props;
  const messagesRef = useRef();

  useEffect(() => {
    messagesRef.current.scrollTop =
      messagesRef.current.scrollHeight;
  }, []);

  return (
    <React.Fragment>
      <div className="container__chat">
        <div className="conversation">
          <div className="search__conversation">
            <input type="text" />
            <span>
              <AiOutlineSearch />
            </span>
          </div>
          <div className="conversation__list">
            <div className="conversation__item">
              <Avatar size={40} />
              <span className="name__chatbox">
                Lorem ipsum dolor
              </span>
              <span className="moreoptions">
                <LuMoreVertical />
              </span>
            </div>
          </div>
        </div>
        <div className="chatbox">
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
          <div className="content__chatbox" ref={messagesRef}>
            <div className="message">
              <div className="message__top">
                <Avatar size={40} className="message__avatar" />
                <p className="message__text">
                  Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Nesciunt tenetur distinctio
                  dolor temporibus, veniam ut illum assumenda
                  molestias, vero vol
                </p>
              </div>
              <div className="message__bottom">1h ago</div>
            </div>
            <div className="message mine">
              <div className="message__top">
                <Avatar size={40} className="message__avatar" />
                <p className="message__text">
                  Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Nesciunt tenetur distinctio
                  dolor temporibus, veniam ut illum assumenda
                  molestias, vero vol
                </p>
              </div>
              <div className="message__bottom">1h ago</div>
            </div>
            <div className="message">
              <div className="message__top">
                <Avatar size={40} className="message__avatar" />
                <p className="message__text">
                  Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Nesciunt tenetur distinctio
                  dolor temporibus, veniam ut illum assumenda
                  molestias, vero vol
                </p>
              </div>
              <div className="message__bottom">1h ago</div>
            </div>
            <div className="message mine">
              <div className="message__top">
                <Avatar size={40} className="message__avatar" />
                <p className="message__text">
                  Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Nesciunt tenetur distinctio
                  dolor temporibus, veniam ut illum assumenda
                  molestias, vero vol
                </p>
              </div>
              <div className="message__bottom">1h ago</div>
            </div>
          </div>
          <div className="send__chatbox">
            <input type="text" />
            <button>
              <LuSendHorizonal />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Chat.propTypes = {
  setShow: PropTypes.func.isRequired,
};

export default Chat;
