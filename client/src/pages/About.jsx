import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WinCard from '../components/WinCard';
import { Button, Spinner } from 'flowbite-react';


export default function About() {

  const { individualWins } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [wins, setWins] = useState(null);
  const [recentWins, setRecentWins] = useState(null);

  useEffect(() => {
    const fetchWin = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/win/getwins?${individualWins}`);
        const data = await res.json();
    
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setWins(data.wins);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchWin();
  }, [individualWins]);

  useEffect(() => {
    try {
      const fetchRecentWins = async () => {
        const res = await fetch(`/api/win/getwins`);
        const data = await res.json();
        if (res.ok) {
          setRecentWins(data.wins);
        }
      };
      fetchRecentWins();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  if (loading)
  return (
<div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Rasulovdev Blog
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
            Welcome to Rasulovdev's blog! This blog was created by Rasulov Nurbek as a personal win to share his thoughts and ideas with the world. Nurbek is an avid developer who loves to write about all things technology, coding, and more.
            </p>

            <p>
            On this blog you will find weekly articles and tutorials on topics
              such as web development, software engineering and programming
              languages.I'm always learning and researching new technologies, so check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Rasulovdev Blog
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
            Welcome to Rasulovdev's blog! This blog was created by Rasulov Nurbek as a personal win to share his thoughts and ideas with the world. Nurbek is an avid developer who loves to write about all things technology, coding, and more.
            </p>

            <p>
            On this blog you will find weekly articles and tutorials on topics
              such as web development, software engineering and programming
              languages. Nurbek is always learning and looking for new things
              technologies, so check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
        {/* Certificate */}
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7' >
            My Certificates
          </h1>
              <div className='text-md text-gray-500 flex flex-col gap-6'>
                 <WinCard key={wins._id} wins={wins}     recentWins={recentWins} id='serf'/>
              </div>
        </div>
      </div>
    </div>
  );
}
