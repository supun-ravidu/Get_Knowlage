import React from 'react';

const NewsletterArchive = () => {
  const archiveItems = [
    {
      title: 'October 2025 Edition',
      summary: 'A look at the latest trends in web development and design.',
      link: '#',
    },
    {
      title: 'September 2025 Edition',
      summary: 'Our favorite tools and resources from the past month.',
      link: '#',
    },
    {
      title: 'August 2025 Edition',
      summary: 'Interviews with industry leaders and community spotlights.',
      link: '#',
    },
    {
      title: 'July 2025 Edition',
      summary: 'A deep dive into the new features of our latest product.',
      link: '#',
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Newsletter Archive</h2>
      <div className="max-w-2xl mx-auto">
        <ul className="space-y-4">
          {archiveItems.map((item, index) => (
            <li key={index} className="bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700">
              <a href={item.link} className="hover:underline">
                <h3 className="text-xl font-semibold text-blue-400">{item.title}</h3>
                <p className="text-gray-300 mt-2">{item.summary}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NewsletterArchive;
