import { $ } from '@/utils/utils';

export const ConfirmedTotal = () => {
  const confirmedTotal = $('.confirmed-total');

  function setTotalConfirmedNumber(data: any) {
    confirmedTotal.innerText = data.Countries.reduce(
      (total: any, current: any) => (total += current.TotalConfirmed),
      0,
    );
  }

  return {
    setTotalConfirmedNumber,
  };
};
