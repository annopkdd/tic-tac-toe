import React from "react";

interface IDivider {}

const Divider = (props: IDivider) => {
  const {} = props;

  return <div className="w-full h-[1px] bg-slate-300" />;
};

export default Divider;
