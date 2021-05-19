import React, { memo } from "react";
import PropTypes from "prop-types";

function NavigationTab(props) {
  const { items } = props;

  return (
    <ul className="nav nav-tabs navigation_tab" role="tablist">
      {Object.entries(items).map((items, index) => {
        return (
          <li key={items} className="nav-item" role="presentation">
            <a
              className={`nav-link ${index === 0 ? "active" : ""}`}
              data-toggle="tab"
              href={`#${items[0]}`}
              role="tab"
              aria-controls={items[1]}
              aria-selected={`${index === 0}` && true}
            >
              {items[1]}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

NavigationTab.propTypes = {
  items: PropTypes.object.isRequired,
};

export default memo(NavigationTab);
