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
import { Avatar, Spin } from "antd";
import ConversationUser from "./ConversationUser";
import Conversation from "./Conversation";

const ChatRoom = () => {
  return <div>ChatRoom</div>;
};

export default ChatRoom;
