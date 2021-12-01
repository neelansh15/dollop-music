function Card({ children }) {
    return (
      <div className="p-5 h-full bg-dark-500 rounded shadow shadow-light-300">
        { children }
      </div>
    );
  }
  
  export default Card;
  