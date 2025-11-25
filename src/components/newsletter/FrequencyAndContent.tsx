import React from 'react';

const FrequencyAndContent = () => {
  const contentItems = [
    {
      title: 'Monthly Schedule',
      description: 'Our newsletter is sent out on the first Tuesday of every month.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: 'In-Depth Articles',
      description: 'Explore detailed posts on the latest industry trends and topics.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: 'Curated Resources',
      description: 'Discover a collection of the best tools, articles, and tutorials.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="mb-12 bg-gray-900 dark:bg-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">What to Expect</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contentItems.map((item, index) => (
            <div key={index} className="bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-md text-center border border-gray-700">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrequencyAndContent;
