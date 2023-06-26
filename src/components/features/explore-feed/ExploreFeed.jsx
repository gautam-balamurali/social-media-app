import { usePosts } from "core/contexts/posts-context/PostsContext";
import FeedPostCard from "components/shared/feed-post-card-components/FeedPostCard";
import "./ExploreFeed.css";

const ExploreFeed = () => {
  const { posts, appliedFilterPosts, isLoading } = usePosts();

  const filteredHomeFeedPosts = appliedFilterPosts(posts);

  return (
    <div className="posts-container">
      {filteredHomeFeedPosts?.length > 0 &&
        filteredHomeFeedPosts.map((post) => (
          <FeedPostCard key={post._id} post={post} />
        ))}
      {filteredHomeFeedPosts?.length < 1 && !isLoading && (
        <h3>No posts found.</h3>
      )}
    </div>
  );
};

export default ExploreFeed;
