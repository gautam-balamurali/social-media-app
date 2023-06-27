import { useAuthentication } from "core/contexts/authentication-context/AuthenticationContext";
import { usePosts } from "core/contexts/posts-context/PostsContext";
import "./HomeFeed.css";
import FeedPostCard from "components/shared/feed-post-card-components/FeedPostCard";

const HomeFeed = () => {
  const { user } = useAuthentication();
  const { posts, appliedFilterPosts, isLoading } = usePosts();

  const homeFeedPosts = posts?.filter(
    (post) =>
      user?.following.some(
        (followingUser) => followingUser?.username === post?.username
      ) || user?.username === post?.username
  );

  const filteredHomeFeedPosts = appliedFilterPosts(homeFeedPosts);

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

export default HomeFeed;