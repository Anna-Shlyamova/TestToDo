import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

const EditIcon: React.FC<SvgIconProps> = ({ sx, ...props }): React.ReactElement => (
  <SvgIcon {...props} viewBox='0 0 24 24' sx={sx} xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d={
        "M3.5 4C3.5 3.72386 3.72386 3.5 4 3.5H12V4.5H4.5V19.5H19.5V12H20.5V20C20.5 20.2761 20.2761 20.5 20" +
        " 20.5H4C3.72386 20.5 3.5 20.2761 3.5 20V4ZM17.3333 3.5C17.4659 3.5 17.5931 3.55268 17.6869 3.64645L20.201" +
        " 6.16061C20.3963 6.35587 20.3963 6.67245 20.201 6.86771L11.4015 15.6673C11.3077 15.761 11.1805 15.8137" +
        " 11.0479 15.8137H8.53378C8.25763 15.8137 8.03378 15.5899 8.03378 15.3137V12.7996C8.03378 12.6669 8.08645" +
        " 12.5398 8.18022 12.446L16.9798 3.64645C17.0735 3.55268 17.2007 3.5 17.3333 3.5ZM9.03378" +
        " 13.0067V14.8137H10.8408L19.1404 6.51416L17.3333 4.70711L9.03378 13.0067Z"
      }
    />
  </SvgIcon>
);

export default EditIcon;
