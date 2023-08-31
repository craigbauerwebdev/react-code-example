import React from "react";

export interface MeetingLogoProps {
  logo: {
    img: string;
    alt: string;
  };
  className: any;
}

export const MeetingLogo: React.SFC<MeetingLogoProps> = ({
  logo,
  className,
}) => {
  if (logo?.img) {
    return (
      <div className={className}>
        <img
          src={logo.img}
          alt={`${logo.alt} logo`} // exhibitor.exhibitor_name
        />
      </div>
    );
  }
  return null;
};
