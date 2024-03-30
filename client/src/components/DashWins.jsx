import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';

export default function DashWins() {
  const { currentUser } = useSelector((state) => state.user);
  const [userWins, setUserWins] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [winIdToDelete, setWinIdToDelete] = useState('');
  useEffect(() => {
    const fetchWins = async () => {
      try {
        const res = await fetch(`/api/win/getwins?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserWins(data.wins);
          if (data.wins.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchWins();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userWins.length;
    try {
      const res = await fetch(
        `/api/win/getwins?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setUserWins((prev) => [...prev, ...data.wins]);
        if (data.wins.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteWin = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/win/deletewin/${winIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserWins((prev) =>
          prev.filter((win) => win._id !== winIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <div className='md:mx-auto p-3'>
          {currentUser.isAdmin && (
              <Link to={'/create-win'}>
                <Button
                  type='button'
                  gradientDuoTone='purpleToPink'
                  className='w-full'
                >
                  Create a Win
                </Button>
              </Link>
            )}
          </div>
      <div className='md:mx-auto p-3'>
          {currentUser.isAdmin && userWins.length > 0 ? (
            <>
              <Table hoverable className='shadow-md'>
                <Table.Head>
                  <Table.HeadCell>Date updated</Table.HeadCell>
                  <Table.HeadCell>Win image</Table.HeadCell>
                  <Table.HeadCell>Win title</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                  <Table.HeadCell>
                    <span>Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                {userWins.map((win) => (
                  <Table.Body className='divide-y'  key={win._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>
                        {new Date(win.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/about#serf`}>
                          <img
                            src={win.image}
                            alt={win.title}
                            className='w-20 h-10 object-cover bg-gray-500'
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          className='font-medium text-gray-900 dark:text-white'
                          to={`/about#serf`}
                        >
                          {win.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setWinIdToDelete(win._id);
                          }}
                          className='font-medium text-red-500 hover:underline cursor-pointer'
                        >
                          Delete
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          className='text-teal-500 hover:underline'
                          to={`/update-win/${win._id}`}
                        >
                          <span>Edit</span>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className='w-full text-teal-500 self-center text-sm py-7'
                >
                  Show more
                </button>
              )}
            </>
          ) : (
            <p>You have no wins yet!</p>
          )}
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size='md'
          >
            <Modal.Header />
            <Modal.Body>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                  Are you sure you want to delete this win?
                </h3>
                <div className='flex justify-center gap-4'>
                  <Button color='failure' onClick={handleDeleteWin}>
                    Yes, I'm sure
                  </Button>
                  <Button color='gray' onClick={() => setShowModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          </div>
      </div>
  );
}
