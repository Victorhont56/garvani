'use client';

import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      alert('Message sent successfully!');
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <div className="max-w-lg mx-auto py-12 px-4 font-sans ">
      <h2 className="text-center text-2xl text-text font-bold mb-6">Get in Touch</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Your Name"
            {...register('name', { required: 'Name is required' })}
            className={`w-full border rounded-lg p-3 bg-gray-100 focus:outline-none ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Your Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Invalid email address',
              },
            })}
            className={`w-full border rounded-lg p-3 bg-gray-100 focus:outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Subject */}
        <div>
          <input
            type="text"
            placeholder="Subject"
            {...register('subject', { required: 'Subject is required' })}
            className={`w-full border rounded-lg p-3 bg-gray-100 focus:outline-none ${
              errors.subject ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
        </div>

        {/* Message */}
        <div>
          <textarea
            placeholder="Message"
            {...register('message', { required: 'Message is required' })}
            rows={5}
            className={`w-full border rounded-lg p-3 bg-gray-100 focus:outline-none ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-text rounded-lg py-3 font-bold hover:bg-hover transition"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
