export const combine = (classNameList: (string | undefined)[]) => {
  return classNameList
    .filter(
      (className: string | undefined) =>
        className !== undefined && className !== ""
    )
    .join(" ");
};
