import styles from "./ChatThread.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

// interface Props {
//   currentProfile: object;
//   activeHead: object;
// }

function ChatThread({ activeHead, currentProfile }) {
  const [chats, setChats] = useState([]);
  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.bracucommunity.xyz/chat/get-chats/${currentProfile.user_id}/${activeHead.user_id}`
      )
      .then((res) => {
        setChats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`https://api.bracucommunity.xyz/user/getdetails/${activeHead.user_id}`)
      .then((res) => {
        setOtherUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeHead]);

  console.log(otherUser);

  return (
    <div>
      {chats.map((chat, index) => {
        return (
          <div key={index}>
            {chat.content === "" ? (
              <></>
            ) : (
              <div className={styles.oneThread}>
                {chat.send_user_id === currentProfile.user_id ? (
                  <div className={styles.myText}>
                    <img
                      src={
                        !currentProfile.profile_picture
                          ? `./${
                              currentProfile["gender"] === "1"
                                ? "maleAvatar.png"
                                : "femaleAvatar.png"
                            }`
                          : `https://api.bracucommunity.xyz/uploads/${currentProfile.profile_picture}`
                      }
                      className={styles.threadPic}
                      alt=""
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      {currentProfile.firstname} {currentProfile.lastname}
                    </b>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {chat.time_stamp.slice(8, 10)}-{chat.time_stamp.slice(5, 7)}
                    -{chat.time_stamp.slice(0, 4)},{" "}
                    {chat.time_stamp.slice(11, 16)}
                    <br />
                    <div className={styles.chatContent}>{chat.content}</div>
                  </div>
                ) : (
                  <div className={styles.otherText}>
                    <img
                      src={
                        !otherUser.profile_picture
                          ? `./${
                              otherUser["gender"] === "1"
                                ? "maleAvatar.png"
                                : "femaleAvatar.png"
                            }`
                          : `https://api.bracucommunity.xyz/uploads/${otherUser.profile_picture}`
                      }
                      className={styles.threadPic}
                      alt=""
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <b>
                      {otherUser.firstname} {otherUser.lastname}
                    </b>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {chat.time_stamp.slice(8, 10)}-{chat.time_stamp.slice(5, 7)}
                    -{chat.time_stamp.slice(0, 4)},{" "}
                    {chat.time_stamp.slice(11, 16)}
                    <br />
                    <div className={styles.chatContent}>{chat.content}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ChatThread;
