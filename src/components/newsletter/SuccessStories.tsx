import React from 'react';

const SuccessStories = () => {
  const stories = [
    {
      quote: 'I landed my dream job thanks to your monthly tips!',
      author: 'Alex',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      quote: 'The curated resources are a game changer for my workflow.',
      author: 'Jamie',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      quote: 'I love staying updated with the latest trends.',
      author: 'Morgan',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    },
  ];

  return (
    <section className="mb-12 bg-gray-900 dark:bg-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-md text-center border border-gray-700">
              <img
                src={story.avatar}
                alt={story.author}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-300 italic mb-4">"{story.quote}"</p>
              <p className="font-semibold text-white">- {story.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
