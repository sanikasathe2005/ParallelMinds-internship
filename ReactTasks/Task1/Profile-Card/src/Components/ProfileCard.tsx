type ProfileCardProps={
    name:string;
    email:string;
    role:string;
    skills:string;
};
function ProfileCard(props:ProfileCardProps)
{
    return(
        <div className="card">
            <div className="icon">{props.name[0]}</div>

            <h2>{props.name}</h2>

            <p className="role">{props.role}</p>

            <p className="email">{props.email}</p>

            <div className="skills">
                <p>{props.skills}</p>
            </div>
        </div>
    )
}
export default ProfileCard;