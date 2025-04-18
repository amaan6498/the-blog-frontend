import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import HorizontalCard from "../HorizontalCard";
import "./index.css";

const cardInfo = [
  {
    id: 0,
    image:
      "https://www.shutterstock.com/image-photo/demo-text-message-magnifying-glass-600nw-2491336635.jpg",
    date: "8 Apr 2025",
    title: "UX Strategy for SaaS Teams",
    description:
      "User experience (UX) design is an essential part of any software-as-a-service (SaaS) product, and when executed properly, it can be a key driver of success. For SaaS teams, crafting a solid UX strategy is vital in improving user retention, boosting conversions, and making sure customers have a seamless experience from onboarding to ongoing usage. A successful UX strategy begins with understanding the target audience and their pain points. In SaaS products, it’s not just about making the interface look pretty; it’s about optimizing the entire experience so users can easily navigate the software to solve their problems. This means that design choices should be informed by usability tests, data analytics, and user feedback.\n\nThe next key part of a successful UX strategy is optimizing the onboarding experience. For SaaS companies, getting users to engage with the product immediately is crucial. This means providing users with intuitive walkthroughs, tooltips, and clear calls to action that guide them through the product. Additionally, regular updates to the user interface (UI) and feedback loops can ensure that any friction points are addressed quickly. Finally, SaaS teams should focus on retention by making sure the product evolves alongside user needs. This means providing features that solve real-world problems while keeping the experience simple and easy to use. Good UX is about building long-term relationships with customers by making sure they feel valued, heard, and understood.\n\nIn conclusion, an effective UX strategy for SaaS teams involves constant testing, learning, and iterating based on user needs. By prioritizing user experience in every stage of the product lifecycle, SaaS teams can ensure they create software that not only attracts users but keeps them coming back.",
    tags: "UX",
  },
  {
    id: 1,
    image:
      "https://www.shutterstock.com/image-photo/close-up-business-people-working-together-600nw-1575614200.jpg",
    date: "12 Apr 2025",
    title: "Design Thinking in the Modern Workplace",
    description:
      "Design thinking has evolved as one of the most powerful problem-solving methodologies in modern organizations. By focusing on empathy and user-centered design, this approach enables teams to innovate and generate creative solutions that address the needs of customers and stakeholders. Design thinking encourages a deep understanding of the problem before rushing into solutions. The process begins with defining the problem clearly, followed by gathering insights through research and user feedback. The ideation phase allows for the generation of multiple possible solutions, which are then prototyped and tested for viability. This iterative cycle continues until the optimal solution is found.\n\nIn the modern workplace, where the pace of change is rapid and the need for agility is higher than ever, design thinking has become an invaluable tool for fostering innovation. By bringing together cross-functional teams to brainstorm and create prototypes, organizations can quickly test new ideas and refine them based on real-world feedback. This not only accelerates product development but also allows teams to focus on delivering value to the end user rather than just pushing out features. One of the most important aspects of design thinking is its emphasis on collaboration. Teams from various departments — such as marketing, engineering, and customer support — come together to work toward a shared goal of solving the user’s problem.\n\nFurthermore, design thinking encourages organizations to embrace failure as part of the learning process. Instead of seeing failure as a setback, it’s viewed as an opportunity to learn and improve. This mindset shift is essential in fostering a culture of innovation, where team members feel empowered to take risks and try new approaches without fear of judgment. In today’s competitive landscape, companies that adopt design thinking are better equipped to create user-centric products, build stronger relationships with their customers, and ultimately achieve long-term success.",
    tags: "Innovation",
  },
  {
    id: 2,
    image:
      "https://www.shutterstock.com/image-photo/business-people-group-collaboration-workplace-600nw-1469689021.jpg",
    date: "15 Apr 2025",
    title: "Building Effective Remote Teams in 2025",
    description:
      "Remote work has become a standard in today’s workplace, especially in the wake of the global pandemic. But as we move into 2025, the challenge shifts from merely allowing remote work to building effective, high-performing remote teams. In order to thrive, remote teams need more than just the right technology — they need strong communication, clear expectations, and a culture of trust. One of the first steps in building an effective remote team is establishing strong communication protocols. This means not only providing the necessary tools for video calls, instant messaging, and project management, but also creating a culture where team members feel comfortable sharing ideas and asking for help.\n\nFor remote teams to be productive, it’s essential that leaders create clear expectations around communication and deliverables. With team members working across different time zones, asynchronous communication plays a significant role in ensuring that work gets done efficiently. Teams need to have well-documented processes in place, so everyone is aligned on what needs to be done, by when, and who is responsible for what. Regular check-ins and progress updates help keep everyone accountable while also providing a sense of connection among team members.\n\nAnother key to success in remote teams is building trust. Trust is the foundation of any successful team, but it’s especially crucial for remote teams that don’t have the benefit of in-person interactions. Leaders must demonstrate transparency, give team members autonomy over their work, and provide opportunities for personal interaction. Virtual team-building activities and informal social events can also play a role in strengthening the bonds between team members.\n\nIn conclusion, building effective remote teams in 2025 requires a combination of communication, clear expectations, and trust. By prioritizing these elements, companies can create remote teams that are not only productive but also happy, engaged, and successful. The future of remote work is bright, but only if companies are willing to adapt and invest in the tools and culture needed to support their teams.",
    tags: "Remote Work",
  },
];

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      // const url = "http://localhost:5000/getAllPosts";
      const url = "https://blog-api-qyqz.onrender.com/getAllPosts";
      const options = {
        method: "GET",
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        if (data.length > 4) {
          setPosts(data.slice(-4));
        } else {
          setPosts(data); // Use all data if less than or equal to 4 items
        }

        // If the API returns no posts, use the fallback data (cardInfo)
      } catch (error) {
        console.error("Error fetching data:", error);
        setPosts(cardInfo); // Fallback to cardInfo in case of an error
      }
    };

    fetchData();
  }, []);
  return (
    <div className="home-container">
      <h1 className="home-head">THE BLOG</h1>
      <p className="home-head-para">
        A Blog about food, experiences, and everything.
      </p>
      <div className="recent-posts">
        <p className="recent-post-para">Recent Blog Posts</p>
        <Link to={"/allposts"} className="allposts-link">
          <p className="all-posts-para">All Posts</p>
        </Link>
      </div>
      <div className="recent-post-container">
        {posts.map((card, index) => (
          <Link to={`/blog/${card.id}`} key={card.id} className="link">
            <HorizontalCard key={card.id} card={card} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
