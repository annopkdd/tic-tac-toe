import React from "react";

interface IFilePicker {
  trigger: React.ReactNode;
  onChange: (file: File) => void;
}

const FilePicker: React.FC<IFilePicker> = (props) => {
  const { trigger, onChange } = props;

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onOpenFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onChooseImageFromInput = (obj: any) => {
    const target = obj.target;
    var file: File = target.files[0];
    console.log("file", file);
    if (onChange) {
      onChange(file);
    }
  };

  return (
    <React.Fragment>
      <div onClick={onOpenFileInput}>{trigger}</div>

      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={onChooseImageFromInput}
      />
    </React.Fragment>
  );
};

export default FilePicker;
