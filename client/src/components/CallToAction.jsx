import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CallToAction(props) {
    const [loading, setLoading] = useState(true);
    const project = props.project;
    const recentProjects = props.recentProjects;
    
    // console.log(project)

    // if (loading)
    // return (
  // <div className='flex justify-center items-center min-h-screen'>
  //         <Spinner size='xl' />
  //       </div>
  //     );
  //     setLoading(false);

    return (
      <>
       <div>
       {recentProjects &&
              recentProjects.map((recentProject) => 
          <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'
          key={recentProject._id}>
              <div className="flex-1 justify-center flex flex-col" >
                  <h2 className='text-2xl'  >
                      {recentProjects && recentProject.title}
                  </h2>
                  <p className='text-gray-500 my-2' 
                      dangerouslySetInnerHTML={{ __html: recentProject.content }}>
                  </p>
              <div className='flex flex-col sm:flex-row '>
                  <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none m-2'>
                          <a href={recentProjects && recentProject.projecturl} target='_blank' rel='noopener noreferrer'>
                              Demo
                          </a>
                      </Button>
                      <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none m-2'>
                          <a href={recentProjects && recentProject.source} target='_blank' rel='noopener noreferrer'>
                              Source Code
                          </a>
                      </Button>
              </div>
              </div>
              <div className="p-7 flex-1"   >
                  <img
                      src={recentProjects && recentProject.image}
                      alt={recentProjects && recentProject.title}
                      className='mt-10 p-3 max-h-[600px] w-full object-cover'
                    />
              </div>
          </div>
              )}
       </div>
      </>
    )
}
