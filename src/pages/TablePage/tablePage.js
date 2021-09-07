import React, { Component } from "react";
import MainTable from "../../components/mainTable/mainTable";
import FiltersComponent from "../../components/filtersComponent/filtersComponent";
import { withRouter } from "react-router-dom";
import { data, bigData } from "./data";
import { BST } from "./binarySearchTree";

import "./tablePage.style.scss";

class TablePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      starData: window.localStorage.getItem("starData")
        ? JSON.parse(window.localStorage.getItem("starData"))
        : [],
    };

    this.sortField = this.sortField.bind(this);
    this.setStarData = this.setStarData.bind(this);
    this.addStarItem = this.addStarItem.bind(this);
    this.deleteStarItem = this.deleteStarItem.bind(this);
  }
  setStarData() {
    const { starData } = this.state;

    const newData = data.map((item, key) => ({ star: false, ...item }));
    if (starData.length !== 0) {
      newData.forEach((item) => {
        starData.forEach((starI) => {
          if (starI.id === item.id) {
            item.star = true;
          }
        });
      });
    }

    return newData;
  }

  filterDatas = (key) => {
    const { filterTypes } = this.state;
    const { history } = this.props;
    const { search, state } = history.location;

    if (!search) {
      this.setState({
        data: this.setStarData(),
      });
    } else {
      console.log(state);
      this.setState({
        data: state.date
          ? this.binarySearchTree(state.date)
          : this.state.data
              // this.setStarData()
              .filter((item) => {
                for (let key in state) {
                  if (key === "name") {
                    if (!item[key].toLowerCase().includes(state[key]))
                      return false;
                  } else if (!item[key].includes(state[key])) return false;
                }
                return true;
              }),
      });

      // const key = search.slice(search.search("/?") + 1, search.search("="));

      // const query = new URLSearchParams(search).get(key);
    }
  };
  binarySearchTree = (query) => {
    const { data } = this.state;
    let result = [];
    data.forEach((item) => {
      BST.insert(item);
    });

    const dateFilterResult = BST.find(query);
    if (dateFilterResult) result.push(dateFilterResult.mainValue);
    return result;
  };

  componentDidMount() {
    // this.filterDatas();
    const newData = this.setStarData();
    this.setState({ data: newData }, () => {
      this.filterDatas();
    });
  }

  sortField(data) {
    this.setState({ data });
  }
  deleteStarItem(value) {
    this.setState(
      {
        data: this.state.data.map((item) => {
          if (item.id === value.id) item.star = false;

          return item;
        }),
        starData: this.state.starData.filter((item) => item.id !== value.id),
      },
      () => {
        window.localStorage.setItem(
          "starData",
          JSON.stringify(this.state.starData)
        );
      }
    );
  }
  addStarItem(data) {
    this.setState(
      {
        data: this.state.data.map((item) => {
          if (item.id === data.id) item.star = true;

          return item;
        }),
        starData: [...this.state.starData, { star: true, ...data }],
      },
      () => {
        window.localStorage.setItem(
          "starData",
          JSON.stringify(this.state.starData)
        );
      }
    );
  }
  render() {
    const { data } = this.state;
    return (
      <div className="container">
        <FiltersComponent filterDatas={this.filterDatas} />
        <MainTable
          data={data}
          sortField={this.sortField}
          addStarItem={this.addStarItem}
          deleteStarItem={this.deleteStarItem}
        />
      </div>
    );
  }
}

export default withRouter(TablePage);
