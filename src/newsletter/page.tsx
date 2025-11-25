import React from "react";

const newsletterArchive = [
  { date: "October 2025", title: "AI Trends & Insights" },
  { date: "September 2025", title: "Productivity Hacks" },
  { date: "August 2025", title: "Tech News Roundup" },
];

const successStories = [
  {
    name: "Jane Doe",
    story:
      "After subscribing, Jane landed her dream job using tips from our newsletter!",
  },
  {
    name: "John Smith",
    story:
      "John improved his workflow and doubled his productivity thanks to our expert advice.",
  },
];

export default function NewsletterPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Newsletter</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Why Subscribe?</h2>
        <ul className="list-disc pl-6">
          <li>Exclusive insights and tips</li>
          <li>Early access to new content</li>
          <li>Community events and resources</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Frequency & Content Preview</h2>
        <p>We send out newsletters once a month, packed with curated articles, expert interviews, and actionable advice.</p>
        <div className="mt-4">
          <strong>Next Issue Preview:</strong>
          <ul className="list-disc pl-6">
            <li>Interview with a leading AI researcher</li>
            <li>Top productivity tools for 2025</li>
            <li>Community Q&A highlights</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Newsletter Archive</h2>
        <ul className="list-disc pl-6">
          {newsletterArchive.map((item, idx) => (
            <li key={idx}>
              <span className="font-medium">{item.date}:</span> {item.title}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Success Stories</h2>
        <ul className="list-disc pl-6">
          {successStories.map((story, idx) => (
            <li key={idx}>
              <span className="font-medium">{story.name}:</span> {story.story}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
