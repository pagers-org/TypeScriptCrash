import { $ } from '@/utils/utils';

export const DeathsTotal = () => {
  const deathsTotal = $('.deaths');

  function setTotalDeathsByCountry(data: any) {
    deathsTotal.innerText = data[0].Cases;
  }

  function setTotalDeathsByWorld(data: any) {
    deathsTotal.innerText = data.Countries.reduce(
      (total: any, current: any) => (total += current.TotalDeaths),
      0,
    );
  }

  return {
    setTotalDeathsByCountry,
    setTotalDeathsByWorld,
  };
};
