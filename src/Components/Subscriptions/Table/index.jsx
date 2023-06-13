import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './table.module.css';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';
import Button from '../../Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubscription } from '../../../Redux/Subscriptions/thunks';
import Loader from '../../Shared/Loader';

const Table = ({ data }) => {
  const [stateModal, setStateModal] = useState('');
  const [messageModal, setMessageModal] = useState('');
  const [deletedSubscription, setDeletedSubscription] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editingSubscriptionId, setEditingSubscriptionId] = useState(null);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.subscription.loading);
  const deleteSuccess = useSelector((state) => state.subscription.data);
  const deleteError = useSelector((state) => state.subscription.error);

  useEffect(() => {
    if (Array.isArray(data)) {
      const filteredData = data.filter(
        (subscription) => !deletedSubscription.includes(subscription._id)
      );
      setTableData(filteredData);
    }
  }, [data, deletedSubscription, showDeleteModal]);

  const handleConfirmDelete = (subscriptionId) => {
    setEditingSubscriptionId(subscriptionId);
    setShowConfirmDeleteModal(true);
    setShowDeleteModal(false);
  };

  const handleDelete = (editingSubscriptionId) => {
    dispatch(deleteSubscription(editingSubscriptionId));
    if (deleteSuccess) {
      setDeletedSubscription([...deletedSubscription, editingSubscriptionId]);
      setShowDeleteModal(true);
      setStateModal('success');
      setMessageModal('Subscription has been deleted');
      setShowConfirmDeleteModal(false);
    } else if (deleteError) {
      setStateModal('fail');
      setMessageModal('An Error has ocurred');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const closeModal = () => {
    setShowConfirmDeleteModal(false);
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <table className={styles.tableSubscription}>
          <thead className={styles.containerThead}>
            <tr className={styles.thead}>
              <th>Classes</th>
              <th>Members</th>
              <th>Date</th>
              <th colSpan="2"></th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((subscription) => (
                <tr key={subscription._id} className={styles.item}>
                  {!subscription.classes ? (
                    <td>{'empty'}</td>
                  ) : (
                    <td>{`${subscription.classes.day} ${subscription.classes.time}`}</td>
                  )}
                  {!subscription.members ? (
                    <td>{'empty'}</td>
                  ) : (
                    <td>{`${subscription.members.name} ${subscription.members.lastName}`}</td>
                  )}
                  <td>{formatDate(subscription.date)}</td>
                  <td className={`${styles.itemButton} ${styles.itemButtonEdit}`}>
                    <Link to={`/subscriptions/edit/${subscription._id}`}>
                      <Button
                        img={process.env.PUBLIC_URL + '/assets/images/edit-icon.png'}
                        action={() => history.push(subscription._id)}
                      />
                    </Link>
                  </td>
                  <td className={`${styles.itemButton} ${styles.itemButtonDelete}`}>
                    <Button
                      img={process.env.PUBLIC_URL + '/assets/images/delete-icon.png'}
                      action={() => handleConfirmDelete(subscription._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr className={styles.item}>
                <td colSpan="4">Cannot find any subscription</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {!isLoading && showConfirmDeleteModal && (
        <ConfirmModal
          title="Delete Subscription"
          handler={closeModal}
          onAction={() => handleDelete(editingSubscriptionId)}
          reason="delete"
        >
          Are you sure to delete subscription?
        </ConfirmModal>
      )}
      {showDeleteModal && (
        <ResponseModal handler={closeModal} state={stateModal} message={messageModal} />
      )}
    </div>
  );
};
export default Table;
