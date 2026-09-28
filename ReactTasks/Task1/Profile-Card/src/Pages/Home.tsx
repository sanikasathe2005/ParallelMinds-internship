import ProfileCard from "../components/ProfileCard";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <h1>Profile Card Application</h1>

        <p className="subtitle">Our Team</p>

        <div className="cards">

          <ProfileCard
            name="Pranali Sawant"
            email="pranali@gmail.com"
            role="Backend Developer"
            skills="Java, Node.js, SQL"
          />

          <ProfileCard
            name="Sanika Sathe"
            email="sanika@gmail.com"
            role="Frontend Developer"
            skills="HTML, CSS, JavaScript"
          />

          <ProfileCard
            name="Prachi Yaragatti"
            email="prachi@gmail.com"
            role="UI Designer"
            skills="Figma, CSS, Photoshop"
          />

        </div>
      </div>
    </div>
  );
}

export default Home;