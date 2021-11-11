import Card from "../components/Card";

function profile() {
  return (
    <div className='container'>
      <div className='left'>
        <div className='container'>
          <div className='banner'>
            <img src='#' alt='' />
          </div>
          <div className='details'>
            <img src='#' alt='' />
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
          <Card title='Industry' subtitle='Lil Nas X' imgSrc='#' audioLink='#'>
            LALALLALALALLA
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
