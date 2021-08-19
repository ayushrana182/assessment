import React from "react";

const Subcriptions = (props) => {
  return <div style= {{marginTop: "10px"}}>
    <span style= {{background: "#17b978"}}>

    {props.user.plan}
    </span>
    </div>;
};

export default Subcriptions;
