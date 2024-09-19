import { Avatar } from "@web3uikit/core";
import "./index.less";
import blog1 from "../../assets/blog/blog1.svg";
import blog2 from "../../assets/blog/blog2.svg";
import blog3 from "../../assets/blog/blog3.svg";
import blog4 from "../../assets/blog/blog4.svg";
import blog5 from "../../assets/blog/blog5.svg";
import comment1 from "../../assets/blog/comment1.svg";
import comment2 from "../../assets/blog/comment2.svg";
import comment3 from "../../assets/blog/comment3.svg";
import React, { useEffect, useState } from "react";
import { formatDateTime } from "../../utils/constant";
import api from "../../api/request";
interface NovButtonProps {
  showIcon?: boolean;
  showFollow?: boolean;
  isComment?: boolean;
  setDetailid?: Function;
  item: {};
  index?: number;
  setModalVisiable?: Function;
  setCommentId?: Function;
}

const BlogItem: React.FC<NovButtonProps> = ({
  showIcon = true,
  showFollow = true,
  isComment = false,
  setDetailid,
  item,
  index = 0,
  setModalVisiable,
  setCommentId,
}) => {
  const [iconList, setIconList] = useState([{}]);
  const [commentList, setCommentList] = useState([{}]);
  useEffect(() => {
    setIconList([
      { img: blog1, count: item.tagsAmount },
      { img: blog2, count: item.tagsAmount },
      { img: blog3, count: item.tagsAmount },
      { img: blog4, count: item.tagsAmount },
      { img: blog5, count: item.tagsAmount },
    ]);
    setCommentList([
      { img: comment1, count: item.commentsAmount },
      { img: comment2, count: item.repostsAmount },
      { img: comment3, count: item.viewAmount },
    ]);
  }, [item]);
  const godetail = (id: number) => {
    if (setDetailid) {
      setDetailid(id);
    }
  };
  const follow = (id: string) => {
    console.log(id);
  };
  const commentClick = async (index: number) => {
    if (index === 0) {
      setModalVisiable(true);
      setCommentId(item.id);
      return;
    } else if (index === 1) {
      const res = await api.put("/v1/api/posts/resave", {
        userId: item.userId,
        content: item.content,
        originalId: item.id,
      });
      console.log(res);
    } else {
      return;
    }
  };
  // const addComment = async() => {
  //   const res = await api.post('/v1/api/comments/add' ,{
  //     userId:,
  //     postId:,
  //     content: comment,
  //     parentId:
  //   })
  // }
  if (Object.keys(item).length !== 0) {
    return (
      <div className="item">
        <div className="header">
          <div className="avatar">
            <Avatar isRounded theme="image" />
          </div>

          <div className="detail">
            <div className="name">
              <div>{item?.user.userName}</div>
              <div className="date">{formatDateTime(item?.createdAt)}</div>
            </div>
            {showFollow && (
              <div className="follow" onClick={() => follow(item?.userId)}>
                Follow
              </div>
            )}
          </div>
        </div>
        <div
          className="content"
          style={{ marginLeft: isComment ? "50px" : 0 }}
          onClick={() => godetail(index)}
        >
          {item?.content}
        </div>
        {showIcon && (
          <div className="iconList">
            {iconList.map((item, index) => {
              return (
                <div key={index} className="iconItem">
                  <img src={item.img} className="icon" />
                  <div>{item.count}</div>
                </div>
              );
            })}
          </div>
        )}

        <div
          className="commentList"
          style={{ marginLeft: isComment ? "50px" : 0 }}
        >
          {commentList.map((item, index) => {
            return (
              <div
                key={index}
                className="commentItem"
                onClick={() => commentClick(index)}
              >
                <img src={item.img} className="commentIcon" />
                <div>{item.count}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
export default BlogItem;
