import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { activeSort, sortPosts } from "../actions/index";

class SortCurrentList extends Component {
  state = {
    sort: null
  };
  sortCurrentListStyles = css``;
  componentDidMount(props) {
    this.setState({ sort: this.props.thisActiveSort });
  }

  sortStatus = e => {
    console.debug(e.currentTarget.value);
    this.props.thisActivePost(e.currentTarget.value);
    this.props.thisSortPosts(e.currentTarget.value);
  };

  render() {
    return (
      <div className="SortCurrentListStyles">
        <form>
          <label
            htmlFor="filter-category"
            className={`${this.sortCurrentListStyles}_filter`}
          >
            <span className={`${this.sortCurrentListStyles}_filter-label`}>
              Sort By:
            </span>
            <select
              id="filter-category"
              className={`${this.sortCurrentListStyles}_filter-select`}
              value={this.state.selectStatus}
              onChange={e => this.sortStatus(e)}
            >
              <option value="dateNew">Date (newest)</option>
              <option value="dateOld">Date (oldest)</option>
              <option value="scoreHighest">Score (highest)</option>
              <option value="scoreLowest">Score (lowest)</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    thisActiveSort: state.activeSort
  };
};

const mapDispatchToProps = dispatch => {
  return {
    thisActivePost: sort => {
      dispatch(activeSort(sort));
    },
    thisSortPosts: sort => {
      dispatch(sortPosts(sort));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortCurrentList);
