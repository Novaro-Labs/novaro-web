import FollowList from "../../components/FollowList";
import BlogList from "../../components/BlogList";
import "./index.less";
import { Input, Avatar, Modal } from "@web3uikit/core";
import { Search } from "@web3uikit/icons";
import post1 from "../../assets/blog/post1.svg";
import post2 from "../../assets/blog/post2.svg";
import post3 from "../../assets/blog/post3.svg";
import post4 from "../../assets/blog/post4.svg";
import { useState } from "react";
import BlogItem from "../../components/BlogList/BlogItem";
import api from "../../api/request";
import { useEffect } from "react";

const HomePage = () => {
  const [detailid, setDetailid] = useState(-1);
  const [post, setPost] = useState("");
  const [list, setList] = useState<[]>([]);
  const [item, setItem] = useState({}); //detail
  const [modalVisiable, setModalVisiable] = useState(false);
  const [commentId, setCommentId] = useState(0);
  const [comment, setComment] = useState("");
  const postList = [
    { img: post1 },
    { img: post2 },
    { img: post3 },
    { img: post4 },
  ];
  const back = () => {
    setDetailid(-1);
  };
  const input = (e) => {
    setPost(e.target.value);
  };
  const getPost = async () => {
    const res = await api.post("v1/api/posts/list", {
      page: 1,
      size: 10,
    });
    setList(res.data);
    setPost("");
  };
  const addPost = async () => {
    const res = await api.put("/v1/api/posts/save", {
      userId: "83945b64190c4d429ecc79c26defb3e4",
      content: post,
    });
    console.log(res);
    getPost();
  };
  const addComment = async () => {
    const res = await api.post("/v1/api/comments/add", {
      userId: "83945b64190c4d429ecc79c26defb3e4",
      postId: commentId,
      content: comment,
    });
  };
  useEffect(() => {
    getPost();
  }, []);
  useEffect(() => {
    console.log(detailid, list);
    if (detailid > -1) {
      setItem(list[detailid]);
    }
  }, [detailid, list]);
  return (
    <div className="home-container">
      {detailid !== -1 ? (
        <div className="home-left">
          <div className="back" onClick={back}>
            <p>{"<"}</p>
            <p>{"back"}</p>
          </div>
          <BlogItem
            showIcon={false}
            item={item}
            setModalVisiable={setModalVisiable}
            setCommentId={setCommentId}
          />
          {/* <div className="detailComment">
            <BlogItem showIcon={false} showFollow={false} isComment={true} />
          </div> */}
        </div>
      ) : (
        <div className="home-left">
          <div className="home-left-top">
            <div className="header">
              <div>Home</div>
              <div className="search">
                <Input
                  style={{
                    background: "#f7f7f7",
                    outline: "none",
                    height: "100%",
                    width: "100%",
                    padding: 0,
                  }}
                  className={"search"}
                  placeholder="Search or type a command"
                  prefixIcon={<Search style={{ color: "#A2A5B1" }} />}
                  name="Test text Input"
                  onBlur={function noRefCheck() {}}
                  onChange={function noRefCheck() {}}
                />
              </div>
            </div>
          </div>
          <div className="postContent">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar isRounded theme="image" />
              <div className="post">
                <input
                  type="text"
                  placeholder="what is happening?"
                  onInput={input}
                />
                <div className="button" onClick={addPost}>
                  {" "}
                  + Post
                </div>
              </div>
            </div>

            <div className="postList">
              {postList.map((item, index) => {
                return (
                  <div key={index}>
                    <img src={item.img} className="listItem" />
                  </div>
                );
              })}
            </div>
          </div>
          <BlogList
            setDetailid={setDetailid}
            list={list}
            setModalVisiable={setModalVisiable}
            setCommentId={setCommentId}
          />
        </div>
      )}

      <div className="home-right">
        <div className="home-right-title">Suggested Follows</div>
        <FollowList />
      </div>
      <Modal
        cancelText="Discard Comment"
        id="regular"
        isVisible={modalVisiable}
        okText="Comment"
        onCancel={function noRefCheck() {
          setModalVisiable(false);
          setComment("");
        }}
        onCloseButtonPressed={function noRefCheck() {
          setModalVisiable(false);
          setComment("");
        }}
        onOk={addComment}
        title={<div>comment</div>}
      >
        <div
          style={{
            padding: "20px 0 20px 0",
          }}
        >
          <Input
            width="100%"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          />
        </div>
      </Modal>
    </div>
  );
};
export default HomePage;
