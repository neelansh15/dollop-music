import { Card, CardTitle, CardSubtitle } from "../components/Card";

function profile() {
  return (
    <div className="container">
      <div className="left">
        {/* Card */}
        <div className="m-10 max-w-2xl">
          <div className="banner">
            <img
              src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
              className="w-full h-40 object-cover"
            />
          </div>
          <div className="bg-light-600 flex p-3">
            <div className="mx-10 -mt-20">
              <img
                src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80"
                alt=""
                className="w-35 h-35 rounded-full object-cover"
              />
            </div>
            <div className="flex items-start">
              <div>
                <h1 className="font-semibold text-3xl">Some name</h1>
                <p className="text-gray-800">Writer, Producer, Top 10 artist</p>
                <ul className="flex space-x-2">
                  <li>Insta</li>
                  <li>Tweet</li>
                  <li>SoundCloud</li>
                </ul>
              </div>
              <div className="mt-2 space-x-2">
                <button>Follow</button>
                <button>Chat</button>
              </div>
            </div>
          </div>
        </div>
        <div className="about">
          <h1>About Me</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quod
            deserunt, repellat assumenda doloribus consequuntur quaerat dolorum
            recusandae eum. Voluptate ipsum sit at, eligendi suscipit voluptates
            doloribus repudiandae ipsam dolores.
          </p>
        </div>
        <div className="recent_music">
          <Card>
            <CardTitle>Hello there!</CardTitle>
            <CardSubtitle>This is amazing</CardSubtitle>
          </Card>
        </div>
      </div>
      <div className="right">
        <div>
          <Card
            title="Industry"
            subtitle="Lil Nas X"
            imgSrc="#"
            audioLink="#"
          ></Card>
        </div>
        <div>
          <Card
            title="Some Body"
            subtitle="Musician"
            imgSrc="#"
            audioLink="None"
          ></Card>
          <Card
            title="Some Body"
            subtitle="Musician"
            imgSrc="#"
            audioLink="None"
          ></Card>
          <Card
            title="Some Body"
            subtitle="Musician"
            imgSrc="#"
            audioLink="None"
          ></Card>
        </div>
      </div>
    </div>
  );
}

export default profile;
