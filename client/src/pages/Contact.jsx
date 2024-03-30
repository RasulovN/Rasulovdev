import React, { useRef } from 'react';
import { Label, TextInput, Textarea,  Button, Card, Checkbox, } from 'flowbite-react';
import emailjs from '@emailjs/browser';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';   

export default function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs
  .sendForm('service_647lgmt', 'template_80o28oa', form.current, {
    publicKey: '2CXZFhqOyVF-jBkPp',
  })
  .then(
    () => {
        showAlert('success', 'Info alert!', 'Change a few things up and try submitting again.')
        alert('success')
    },
    (error) => {
      console.log('FAILED...', error.text);
      errorAlert('failure', 'Error alert!', 'An error occurred. Please try again.');
    }
  );
};
const showAlert = (color, title, message) => {
    return (
    <Alert color="info">
    <span className="font-medium">{title}</span> {message}
  </Alert>
    );
  };
const errorAlert = (color, title, message) => {
    return (
    <Alert color="failure" icon={HiInformationCircle}>
    <span className="font-medium">{title}</span> {message}
  </Alert>
    );
  };
  return (
    <div className='justify-center items-center min-h-screen'>
         <h1 className='text-3xl font font-semibold text-center my-7'>Contact us</h1>
     <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
        <Card
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc="https://www.flowbite-react.com/images/blog/image-1.jpg"
        >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
        </Card>
     </div>

     <h1 className='text-3xl font font-semibold text-center my-7'>Contact us</h1>
     <div className='min-h-screen max-w-2xl mx-auto  justify-center items-center flex-col gap-6 p-3'>
     <Card className="max-w-md">
      <form className="flex flex-col gap-4" ref={form} onSubmit={sendEmail}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="user_name" value="Your Name"  name="user_name"/>
          </div>
          <TextInput id="user_name" type="text" placeholder="Bonnie Green" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput id="email1" type="email" placeholder="name@flowbite.com" name="user_email" required />
        </div>
          <div className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="message" value="Your message" />
                </div>
                <Textarea id="message" name='message' placeholder="Leave a message..." required rows={4} />
            </div>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
     {/* <div className="flex max-w-md flex-col gap-4">
    </div> */}
     </div>
    </div>
  )
}

