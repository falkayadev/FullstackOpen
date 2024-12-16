import Notification from "./Notification";

const Header = ({ errorMessage, title }) => {
  return (
    <>
      {errorMessage && (
        <Notification type={errorMessage.type} message={errorMessage.message} />
      )}
      <h2>{title}</h2>
    </>
  );
};

export default Header;
