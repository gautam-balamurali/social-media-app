/* eslint-disable */

import { usePosts } from "core/contexts/posts-context/PostsContext";
import FeedPostCard from "components/shared/feed-post-card-components/FeedPostCard";
import "./LikedPosts.css";
import FilterBar from "components/shared/filter-bar-component/FilterBar";

const LikedPosts = ({ currentUser }) => {
  const { posts, appliedFilterPosts, isLoading } = usePosts();

  const isLiked = (likedByUsersList) =>
    likedByUsersList.find(
      (likedByUser) => likedByUser.username === currentUser.username
    );
  const likedPosts = posts.filter((post) => isLiked(post?.likes?.likedBy));
  const filteredLikedPosts = appliedFilterPosts(likedPosts);

  return (
    <div className="posts-container">
      {filteredLikedPosts?.length > 0 && (
        <>
          <FilterBar />
          {filteredLikedPosts.map((post) => (
            <FeedPostCard key={post._id} post={post} />
          ))}
        </>
      )}
      {filteredLikedPosts?.length < 1 && !isLoading && (
        <h3>No liked posts found.</h3>
      )}
    </div>
  );
};

export default LikedPosts;
