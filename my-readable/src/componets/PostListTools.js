import React from "react";
import FilterCategories from "./FilterCategories";
import SortCurrentList from "./SortCurrentList";
import AddNewPost from "./AddNewPost";

const PostListTools = () => {
  return (
    <div className="PostListToolsStyles">
      <FilterCategories />
      <SortCurrentList />
      <AddNewPost />
    </div>
  );
};

export default PostListTools;
