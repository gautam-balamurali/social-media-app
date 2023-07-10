/* eslint-disable */

import { usePosts } from "core/contexts/posts-context/PostsContext";
import FeedPostCard from "components/shared/feed-post-card-components/FeedPostCard";
import "./BookmarkedPosts.css";
import FilterBar from "components/shared/filter-bar-component/FilterBar";

const BookmarkedPosts = () => {
  const { posts, bookmarks, appliedFilterPosts, isLoading } = usePosts();

  const bookmarkedPosts = posts.filter((post) =>
    bookmarks.some((postId) => post._id === postId)
  );
  const filteredBookmarkedPosts = appliedFilterPosts(bookmarkedPosts);

  return (
    <div className="posts-container">
      {filteredBookmarkedPosts?.length > 0 && (
        <>
          <FilterBar />
          {filteredBookmarkedPosts.map((post) => (
            <FeedPostCard key={post._id} post={post} />
          ))}
        </>
      )}
      {filteredBookmarkedPosts?.length < 1 && !isLoading && (
        <h3>No bookmarked posts found.</h3>
      )}
    </div>
  );
};

export default BookmarkedPosts;
