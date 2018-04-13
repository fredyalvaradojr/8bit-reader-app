import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { activeSort, sortPosts } from "../actions/index";
import globalStyles from "../utils/globalStyles";
import { hexToRGB } from "../utils/index";

class SortCurrentList extends Component {
  state = {
    sort: null
  };

  SortCurrentListStyles = css`
    margin: 0 0 1em;
    flex: 0 0 60%;
    max-width: 60%;

    &_filter-container {
      flex: 1;
      position: relative;
      text-align: left;
    }

    &_filter {
      //background: ${globalStyles.color.purple};
      padding: 0.1em;
      box-shadow: -0.375em 0.375em 0 0
        rgba(${hexToRGB(globalStyles.color.purple)}, 0.4);
      color: ${globalStyles.color.black};
      font-size: 0.6875em;
      font-weight: 400;
      padding: 0.3em 0.5em;
      width: 100%;
      display: inline-block;
      text-align: left;
    }

    &_filter-label {
      margin-left:0.3em;
    }

    &_filter-select {
      background: none;
      color: ${globalStyles.color.black};
      font-weight: 900;
      text-transform: uppercase;
    }
  `;

  componentDidMount(props) {
    this.setState({ sort: this.props.thisActiveSort });
  }

  sortStatus = e => {
    this.props.thisActivePost(e.currentTarget.value);
    this.props.thisSortPosts(e.currentTarget.value);
  };

  render() {
    return (
      <div
        className={this.SortCurrentListStyles}
        data-class="SortCurrentListStyles"
      >
        <div className={`${this.SortCurrentListStyles}_filter-container`}>
          <form>
            <label
              htmlFor="sort-by"
              className={`${this.SortCurrentListStyles}_filter`}
            >
              <span className={`${this.SortCurrentListStyles}_filter-label`}>
                Sort By:
              </span>
              <select
                id="sort-by"
                className={`${this.SortCurrentListStyles}_filter-select`}
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
