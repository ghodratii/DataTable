import "./filtersComponent.style.scss";
import { useHistory } from "react-router-dom";
import { headTitle } from "../../pages/TablePage/data";

const FiltersComponent = ({ filterDatas }) => {
  const history = useHistory();

  // const filter = (e, key) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     const searchQuery = e.target.value;
  //     history.push(`?${key}=${searchQuery}`);
  //     filterDatas();
  //     e.target.value = "";
  //   }
  // };
  const filter = (e, key) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const searchQuery = e.target.value;
      history.push({
        // pathname: '/',
        search: "?filter",
        state: { ...history.location.state, [key]: searchQuery },
      });
      console.log(history);

      filterDatas(key);
      // e.target.value = "";
    }
  };

  return (
    <section id="filter" className="text-center py-1">
      <p className="lead">You can enter filter</p>
      <div className="text-fields">
        <input
          // value={
          //   history.location.state && history.location.state.name
          //     ? history.location?.state.name
          //     : null
          // }
          className="text-input name-input"
          onKeyDown={(e) => filter(e, "name")}
          // onInput={(e) => filter(e, "name")}
          type="text"
          placeholder="Name"
          name="name"
        />
        <input
          className="text-input title-input"
          onKeyDown={(e) => filter(e, "title")}
          type="text"
          placeholder={headTitle.title}
          name="title"
        />
        <input
          // value={
          //   history.location.state && history.location.state.field
          //     ? history.location?.state.field
          //     : ""
          // }
          className="text-input field-input"
          onKeyDown={(e) => filter(e, "field")}
          type="text"
          placeholder={headTitle.field}
          name="field"
        />
        <input
          className="text-input date-input"
          onKeyDown={(e) => filter(e, "date")}
          type="date"
          placeholder="date"
          name="date"
        />
      </div>
    </section>
  );
};

export default FiltersComponent;
