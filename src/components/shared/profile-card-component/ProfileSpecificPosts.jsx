import { usePosts } from "core/contexts/posts-context/PostsContext";
import FeedPostCard from "../feed-post-card-components/FeedPostCard";
import FilterBar from "../filter-bar-component/FilterBar";

const ProfileSpecificPosts = ({ username }) => {
  const { posts, appliedFilterPosts, isLoading } = usePosts();

  const profileSpecificPosts = posts?.filter(
    (post) => username === post?.username
  );

  const filteredProfileSpecificPosts = appliedFilterPosts(profileSpecificPosts);

  return (
    <div className="posts-container">
      {filteredProfileSpecificPosts?.length > 0 && (
        <>
          <FilterBar />
          {filteredProfileSpecificPosts.map((post) => (
            <FeedPostCard key={post._id} post={post} />
          ))}
        </>
      )}
      {filteredProfileSpecificPosts?.length < 1 && !isLoading && (
        <h3>No posts found.</h3>
      )}
    </div>
  );
};

export default ProfileSpecificPosts;
