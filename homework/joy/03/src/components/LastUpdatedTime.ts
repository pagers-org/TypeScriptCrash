import { $ } from '@/utils/utils';

export const LastUpdatedTime = () => {
  const lastUpdatedTime = $('.last-updated-time');

  function setLastUpdatedTimestamp(data: any) {
    lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
  }

  return {
    setLastUpdatedTimestamp,
  };
};
