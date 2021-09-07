import React, { Component } from "react";
import "./mainTable.scss";

import { headTitle } from "../../pages/TablePage/data";
class MainTable extends Component {
  renderTableHeader() {
    if (this.props.data.length === 0)
      return <td className="section-title">no data</td>;
    let header = Object.keys(this.props.data[0]);
    return header.map((key, index) => {
      return (
        <th key={index}>
          {key !== "star" ? (
            <>
              <i
                onClick={(e) => this.onSort(e, key, "ascending")}
                className="sort-icon fas fa-arrow-up"
              ></i>

              <i
                onClick={(e) => this.onSort(e, key, "descending")}
                className="sort-icon fas fa-arrow-down"
              ></i>
            </>
          ) : (
            ""
          )}
          <span className="head-title">{headTitle[key]}</span>
          {/* {key.toUpperCase()} */}
        </th>
      );
    });
  }
  toggleStar(event, item) {
    if (item.star) {
      //delete from local and set state(star=false)
      this.props.deleteStarItem(item);
    } else {
      //add to local and star=true
      this.props.addStarItem(item);
    }
  }
  onSort(event, sortKey, config) {
    const { data } = this.props;

    data.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return config === "ascending" ? -1 : 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return config === "ascending" ? 1 : -1;
      }
      return 0;
    });

    // data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    this.props.sortField(data);
  }
  renderTableData() {
    return this.props.data.map((item, index) => {
      const { id, name, old_value, new_value, field, date, title, star } = item; //destructuring
      return (
        <tr key={id}>
          <td>
            {star ? (
              <i
                onClick={(e) => this.toggleStar(e, item)}
                className="star-icon fas fa-star"
              ></i>
            ) : (
              <i
                onClick={(e) => this.toggleStar(e, item)}
                className="star-icon far fa-star"
              ></i>
            )}
          </td>
          <td>{id}</td>
          <td>{name}</td>
          <td>{date}</td>
          <td>{title}</td>
          <td>{field}</td>
          <td>{old_value}</td>
          <td>{new_value}</td>
        </tr>
      );
    });
  }
  render() {
    // const { data } = this.props.data;

    return (
      <div className="my-1">
        {/* <h1 className="section-title">Data Table</h1> */}
        <table id="table">
          <thead>
            <tr>{this.renderTableHeader()}</tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default MainTable;
