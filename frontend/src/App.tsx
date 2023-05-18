import { useCallback, useEffect, useState } from 'react'
import { Button, Popconfirm, Table } from 'antd';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './App.css';
import UserModal from './components/modal/modal.component';
import UserService from './services/users.service';
import IUser from './types/user.type';

const api = new UserService();
function App() {
  enum FormType { edit, add }

  const [usersList, setUsersList] = useState([]);
  const [formType, setFormType] = useState(FormType.add);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const getUsers = useCallback(async () => {
    const data = await api.fetchUsers();
    setUsersList(data);
  }, [])

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: false,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      editable: false,
      key: 'age',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: IUser) =>
        <>
          <Button
            id='edit-button'
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              showModal();
              setFormType(FormType.edit);
              setEditedUser(record);
            }}>
            Edit
          </Button>
          <Popconfirm
            title="Delete food"
            description="Are you sure to delete this food?"
            onConfirm={() => handleDeleteUser(record)}
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
            <Button type="text" danger icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </>
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(false);
  };

  const handleEditUser = async (id: number, updateUser: IUser) => {
    await api.updateUser(id, updateUser)?.then(() => getUsers());
    setEditedUser(updateUser);
  }

  const handleAddUser = async (user: IUser) => {
    await api.addUser(user)?.then(() => getUsers());
  }

  const handleDeleteUser = async (user: IUser) => {
    await api.deleteUser(user.id)?.then(() => getUsers());
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <h2 style={{ flex: '1' }}>Users List</h2>
        <Button type="primary" onClick={() => {
          showModal();
          setFormType(FormType.add);
        }} >Add User</Button>
      </div>

      <UserModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        editedUser={editedUser}
        formType={formType}
        handleAddUser={handleAddUser}
        handleEditUser={handleEditUser}
      />

      <Table
        scroll={{ y: 500 }}
        bordered
        dataSource={usersList}
        columns={columns}
        pagination={false}
      />
    </>
  );
}

export default App
