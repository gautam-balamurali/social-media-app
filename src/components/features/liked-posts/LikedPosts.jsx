import { usePosts } from "core/contexts/posts-context/PostsContext";
import FeedPostCard from "components/shared/feed-post-card-components/FeedPostCard";
import "./LikedPosts.css";

const LikedPosts = ({currentUser}) => {
  const { posts, appliedFilterPosts, isLoading } = usePosts();

  const isLiked = (likedByUsersList) =>
    likedByUsersList.find(
      (likedByUser) => likedByUser.username === currentUser.username
    );
  const likedPosts = posts.filter((post) => isLiked(post?.likes?.likedBy));
  const filteredBookmarkedPosts = appliedFilterPosts(likedPosts);

  return (
    <div className="posts-container">
      {filteredBookmarkedPosts?.length > 0 &&
        filteredBookmarkedPosts.map((post) => (
          <FeedPostCard key={post._id} post={post} />
        ))}
      {filteredBookmarkedPosts?.length < 1 && !isLoading && (
        <h3>No liked posts found.</h3>
      )}
    </div>
  );
};

export default LikedPosts;
