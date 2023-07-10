import { usePosts } from "core/contexts/posts-context/PostsContext";
import FeedPostCard from "components/shared/feed-post-card-components/FeedPostCard";
import SearchBar from "components/shared/search-bar-component/SearchBar";
import "./ExploreFeed.css";
import FilterBar from "components/shared/filter-bar-component/FilterBar";

/* eslint-disable */

const ExploreFeed = () => {
  const { posts, appliedFilterPosts, isLoading } = usePosts();

  const filteredExploreFeedPosts = appliedFilterPosts(posts);

  return (
    <div className="posts-container">
      <div className="explore-feed-search-bar">
        <SearchBar />
      </div>
      <FilterBar />
      {filteredExploreFeedPosts?.length > 0 &&
        filteredExploreFeedPosts.map((post) => (
          <FeedPostCard key={post._id} post={post} />
        ))}
      {filteredExploreFeedPosts?.length < 1 && !isLoading && (
        <h3>No posts found.</h3>
      )}
    </div>
  );
};

export default ExploreFeed;
