import { Card, CardTitle, CardSubtitle } from "../components/Card";

function profile() {
  return (
    <div className='container'>
      <div className='left'>
        <div className='container'>
          <div className='banner'>
            <img
              src='https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              alt=''
            />
          </div>
          <div className='details flex bg-light-600'>
            <img
              width='150px'
              aspect-ratio='1'
              border-radius='50%'
              src='https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80'
              alt=''
            />
            <div>
              <div>
                <h1>Some name</h1>
                <p>Writer, Producer, Top 10 artist</p>
              </div>
              <button>Follow</button>
              <button>Chat</button>
            </div>
            <div className='socials'>
              <ul>
                <li>Insta</li>
                <li>Tweet</li>
                <li>SoundCloud</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='about'>
          <h1>About Me</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quod
            deserunt, repellat assumenda doloribus consequuntur quaerat dolorum
            recusandae eum. Voluptate ipsum sit at, eligendi suscipit voluptates
            doloribus repudiandae ipsam dolores.
          </p>
        </div>
        <div className='recent_music'>
          <Card>
            <CardTitle>Hello there!</CardTitle>
            <CardSubtitle>This is amazing</CardSubtitle>
          </Card>
        </div>
      </div>
      <div className='right'>
        <div>
          <Card
            title='Industry'
            subtitle='Lil Nas X'
            imgSrc='#'
            audioLink='#'
          ></Card>
        </div>
        <div>
          <Card
            title='Some Body'
            subtitle='Musician'
            imgSrc='#'
            audioLink='None'
          ></Card>
          <Card
            title='Some Body'
            subtitle='Musician'
            imgSrc='#'
            audioLink='None'
          ></Card>
          <Card
            title='Some Body'
            subtitle='Musician'
            imgSrc='#'
            audioLink='None'
          ></Card>
        </div>
      </div>
    </div>
  );
}

export default profile;
