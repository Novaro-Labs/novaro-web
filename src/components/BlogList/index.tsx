import BlogItem from "./BlogItem.tsx";
interface NovButtonProps {
  setDetailid?: Function;
  list: [];
  setModalVisiable?: Function;
  setCommentId?: Function;
}
const BlogList: React.FC<NovButtonProps> = ({
  setDetailid,
  list,
  setModalVisiable,
  setCommentId,
}) => {
  return (
    <div>
      {list.map((item, index) => {
        return (
          <BlogItem
            key={index}
            setDetailid={setDetailid}
            item={item}
            index={index}
            setModalVisiable={setModalVisiable}
            setCommentId={setCommentId}
          />
        );
      })}
    </div>
  );
};
export default BlogList;
