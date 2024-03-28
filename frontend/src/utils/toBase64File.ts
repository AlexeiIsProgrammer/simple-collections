const toBase64File = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = () => {
      const fileRes = btoa(reader?.result as string);
      resolve(`data:image/jpg;base64,${fileRes}`);
    };

    reader.onerror = () => {
      reject(new Error('There is a trouble..'));
    };
  });

export default toBase64File;
