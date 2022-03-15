export const createUUID = () => {
  let present = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, callback => {
    const randomNumber = (present + Math.random() * 16) % 16 | 0;
    present = Math.floor(present / 16);
    return (
      callback == 'x' ? randomNumber : (randomNumber & 0x3) | 0x8
    ).toString(16);
  });
};
