import { $ } from '@/utils/utils';

export const RecoveredTotal = () => {
  const recoveredTotal = $('.recovered');

  function setTotalRecoveredByCountry(data: any) {
    recoveredTotal.innerText = data[0].Cases;
  }

  function setTotalRecoveredByWorld(data: any) {
    recoveredTotal.innerText = data.Countries.reduce(
      (total: any, current: any) => (total += current.TotalRecovered),
      0,
    );
  }

  return {
    setTotalRecoveredByCountry,
    setTotalRecoveredByWorld,
  };
};
