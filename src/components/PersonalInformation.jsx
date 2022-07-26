const PersonalInformation = ({ infoTitle, infoValue }) => {
  return (
    <div className="mb-3">
      <div className="text-xs">{infoTitle}</div>
      <div className="font-bold">{infoValue}</div>
    </div>
  );
};

export default PersonalInformation;
