import { Modal, Form, Input, Button } from 'antd';
import IUser from '../../types/user.type';

const UserModal = (props: any) => {

  enum FormType { edit, add }

  const handleAddUser = async (values: IUser) => {
    props.handleAddUser(values);
    props.toggleModal();
  }

  const handleEditUser = (id: number, updatedUser: IUser) => {
    props.handleEditUser(id, updatedUser);
    props.toggleModal();
  }
  return (
    <Modal
      destroyOnClose={true}
      title={"user form"}
      footer={[]}
      open={props.isModalOpen}
      onCancel={props.toggleModal}
    >
      <Form
        onFinish={props.formType == FormType.add
          ? (values: IUser) => { handleAddUser(values) }
          : (values: IUser) => { handleEditUser(values.id, values) }
        }
        labelCol={{ span: 6 }}
        layout="horizontal"
        requiredMark
        initialValues={{
          id: props.editedUser?.id,
          name: props.editedUser?.name,
          age: props.editedUser?.age
        }}
      >
        <Form.Item name="id" label="id">
          <Input name="id" type='number' />
        </Form.Item>

        <Form.Item name="name" label="name">
          <Input name="name" type="string" />
        </Form.Item>

        <Form.Item name="age" label="age">
          <Input name="age" type="string" />
        </Form.Item>

        <Form.Item>
          <Button style={{ width: '100%' }} htmlType='submit' type='primary'>submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserModal