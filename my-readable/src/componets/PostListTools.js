import React from "react";
import { css } from "emotion";
import FilterCategories from "./FilterCategories";
import SortCurrentList from "./SortCurrentList";
import AddNewPost from "./AddNewPost";

const PostListToolsStyles = css`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;
`;

const PostListTools = () => {
  return (
    <div className={PostListToolsStyles} data-class="PostListToolsStyles">
      <SortCurrentList />
      <FilterCategories />
    </div>
  );
};

export default PostListTools;
