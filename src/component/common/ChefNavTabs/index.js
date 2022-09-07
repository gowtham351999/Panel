import React from "react";
import classnames from "classnames";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { NormalSearch } from "component/common/NormalSearch";
import "./style.scss";

const NavTabs = ({
  tablist = "",
  activeTab = "",
  setActiveTab,
  isSearchNeeded = false,
  searchValue = "",
  handleInputSearch = {},
}) => (
  <div className="common-navlink">
    <div className="filled-tabs">
      <div className="tabs-block position-relative">
        {isSearchNeeded ? (
          <div className="tab-search">
            <NormalSearch
              placeholder="Search"
              value={searchValue}
              name="searchValue"
              onChange={handleInputSearch}
            />
          </div>
        ) : null}
        <Nav tabs>
          {tablist.map((list, index) => (
            <NavItem key={index}>
              <NavLink
                className={classnames({
                  active: activeTab === list.id,
                })}
                onClick={() => setActiveTab(list.id)}
              >
                {list.moduleName}
                {list.totalCount ? (
                  <span
                    className="count fs-16"
                    style={{ background: list.color, color: list.textColor }}
                  >
                    {list.totalCount}
                  </span>
                ) : null}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </div>
      <TabContent activeTab={activeTab}>
        {tablist.map((list, index) => {
          let ComponentName = list.component;
          return (
            <TabPane tabId={list.id} key={index}>
              {activeTab === list.id ? (
                <ComponentName search={searchValue} />
              ) : null}
            </TabPane>
          );
        })}
      </TabContent>
    </div>
  </div>
);

export default NavTabs;
