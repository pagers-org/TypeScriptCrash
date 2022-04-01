function getCurrentTime() {
  return new Date().getTime();
}

class TimeChecker {
  private timeMap = new Map();

  public setWaitTime(key: string, timeMillis: number) {
    this.timeMap.set(key, new Date().getTime() + timeMillis);
  }

  public isTimeOver(key: string): boolean {
    const time: number = this.timeMap.get(key);

    return time ? getCurrentTime() > time : true;
  }
}

export const useTimer = (key: string) => {
  const timer = new TimeChecker();

  function setWaitTime(timeMillis: number) {
    return timer.setWaitTime(key, timeMillis);
  }

  function isTimeOver() {
    return timer.isTimeOver(key);
  }

  return {
    setWaitTime,
    isTimeOver,
  };
};
