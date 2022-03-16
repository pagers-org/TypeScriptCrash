/**
 * itemProps를 string 으로 변환
 * @param itemProps
 */
const convertItemProps = itemProps => JSON.stringify(itemProps);

/**
 * itemProps 를 Object 로 변환
 * @param itemProps
 */
const parseItemInfo = itemProps => JSON.parse(itemProps);

/**
 * storageKey의 itemProps 를 localStorage에 저장
 * @param storageKey itemProps
 */
const setItemProps = (storageKey, itemProps) => {
  const convertedItemsProps = convertItemProps(itemProps);
  localStorage.removeItem(storageKey);
  localStorage.setItem(storageKey, convertedItemsProps);
};

/**
 * localStorage에 저장된 값를 반환
 * @param storageKey
 */
const getItemProps = storageKey => {
  const localStorageItem = localStorage.getItem(storageKey);
  if (localStorageItem) {
    try {
      return parseItemInfo(localStorageItem);
    } catch (error) {
      console.warn(error);
      return null;
    }
  }
  return null;
};

export const storageManager = {
  convertItemProps,
  parseItemInfo,
  setItemProps,
  getItemProps,
};
