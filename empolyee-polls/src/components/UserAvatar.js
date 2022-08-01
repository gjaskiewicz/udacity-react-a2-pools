import "./css/UserAvatar.css";

const UserAvatar = ({ user }) => {
    if (!user) {
        return (<div>Unknown</div>);
    }

    return (
    <div className="userAvatar">
        { user.avatarURL && <img src={user.avatarURL} alt="User avatar" className="userAvatarImage" /> }
        <span>{user.name}</span>
    </div>)
};

export default UserAvatar;