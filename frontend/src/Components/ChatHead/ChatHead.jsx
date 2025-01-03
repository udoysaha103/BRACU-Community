import axios from "axios";
import "./ChatHead.css";
import { useEffect, useState } from "react";

// interface Props {
//   currentProfile: { user_id: string };
//   chatHead: { seen_status: number; user_id: string; time_stamp: string };
//   setActiveHead: (chatHead: object) => void;
// }

function ChatHead({ currentProfile, chatHead, setActiveHead }) {
  const [chatHeadProfile, setChatHeadProfile] = useState({});
  const [seenStatus, setSeenStatus] = useState(chatHead.seen_status);

  useEffect(() => {
    axios
      .get(`https://api.bracucommunity.xyz/user/getdetails/${chatHead.user_id}`)
      .then((res) => {
        setChatHeadProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    
    if (seenStatus === 0) {
      axios.get(`https://api.bracucommunity.xyz/chat/get-last-message/${currentProfile.user_id}/${chatHead.user_id}`)
      .then((res) => {
        if (res.data.send_user_id === currentProfile.user_id) {
          setSeenStatus(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  }, []);

  const handleClick = () => {
    setActiveHead(chatHead);

    if (chatHead.seen_status === 0) {
      axios
        .put("https://api.bracucommunity.xyz/chat/update-seen-status", {
          this_id: currentProfile.user_id,
          another_id: chatHead.user_id,
        })
        .then(() => {
          setSeenStatus(1);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  
  return (
    <>
      {seenStatus === 0 ? (
        <div id="boldHead" onClick={handleClick}>
          <div className="row">
            <div className="col-3">
              {chatHeadProfile.gender === "1" ? (
                <img
                  src="./maleAvatar.png"
                  alt="Profile"
                  className="ProfilePic"
                />
              ) : (
                <img
                  src="./femaleAvatar.png"
                  alt="Profile"
                  className="ProfilePic"
                />
              )}
            </div>
            <div className="col-9">
              <h4>
                <b>
                  {chatHeadProfile.firstname} {chatHeadProfile.lastname}
                </b>
              </h4>
              <p id="timestamptext">
                <b>
                  {chatHead.time_stamp.slice(8, 10)}-
                  {chatHead.time_stamp.slice(5, 7)}-
                  {chatHead.time_stamp.slice(0, 4)},{" "}
                  {chatHead.time_stamp.slice(11, 16)}
                </b>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div id="normalHead" onClick={handleClick}>
          <div className="row">
            <div className="col-3">
              {chatHeadProfile.gender === "1" ? (
                <img
                  src="./maleAvatar.png"
                  alt="Profile"
                  className="ProfilePic"
                />
              ) : (
                <img
                  src="./femaleAvatar.png"
                  alt="Profile"
                  className="ProfilePic"
                />
              )}
            </div>
            <div className="col-9">
              <h4>
                {chatHeadProfile.firstname} {chatHeadProfile.lastname}
              </h4>
              <p id="timestamptext">
                {chatHead.time_stamp.slice(8, 10)}-
                {chatHead.time_stamp.slice(5, 7)}-
                {chatHead.time_stamp.slice(0, 4)},{" "}
                {chatHead.time_stamp.slice(11, 16)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatHead;
