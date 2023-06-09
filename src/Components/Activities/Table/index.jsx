import React from 'react';
import { useState, useEffect } from 'react';
import styles from './table.module.css';

import Activity from '../Activity';

const Table = ({ activities, onDelete }) => {
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    setFilter(activities);
  }, [activities]);

  const filterList = (value) => {
    const activitiesToShow = activities.filter((activity) =>
      activity.name.toLowerCase().includes(value)
    );
    setFilter(activitiesToShow);
  };

  return (
    <>
      <h2 className={styles.title}>Activities</h2>
      <div className={styles.tableFilter}>
        <input
          className={styles.tableInputFilter}
          type="text"
          placeholder="Search by name"
          onChange={(e) => filterList(e.target.value.toLowerCase())}
        />
        <img src="/assets/images/search-icon.png" alt="" />
        {filter.length === 0 ? <p className={styles.tableError}>Not found it</p> : ''}
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={`${styles.tableHeader} ${styles.tableRow}`}>
              <th>Activity</th>
              <th>Description</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filter.map((activity) => (
              <Activity key={activity._id} activity={activity} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;