const Message = ({ children }) => {
  return (
    <div className="ui icon message">
      <i className="icon info"></i>
      <div className="content">
        <div className="header">{children}</div>
      </div>
    </div>
  );
};

export default Message;
