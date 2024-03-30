import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { Button, Spinner } from 'flowbite-react';

export default function ProjectPage() {
  const { individualProjects } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [projects, setProjects] = useState(null);
  const [recentProjects, setRecentProjects] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/project/getprojects?${individualProjects}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setProjects(data.projects);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProject();
  }, [individualProjects]);

  useEffect(() => {
    try {
      const fetchRecentProjects = async () => {
        const res = await fetch(`/api/project/getprojects`);
        const data = await res.json();
        if (res.ok) {
          setRecentProjects(data.projects);
        }
      };
      fetchRecentProjects();
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
    const uniqueProjectIds = [...new Set(projects.map(project => project._id))];

  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
     
      <div>
      {/* {recentProjects.map(projectId => (
      <CallToAction key={projectId} project={projects.find(project => project._id === projectId)} recentProjects={recentProjects} />
    ))} */}
        {/* {recentProjects && recentProjects.map((projects) => ( */}
            <CallToAction key={projects._id} projects={projects} recentProjects={recentProjects} />
        {/* ))} */}
      </div>

      <p className='text-md text-gray-500'>Build fun and engaging projects while learning HTML, CSS, and JavaScript!</p>
    </div>
  )
}
